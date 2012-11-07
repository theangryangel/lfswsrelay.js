var lfswsrelay = (function ()
{

// Basic required packets

var IS_NONE = function(buf)
{
	this._fmt = '';
}

IS_NONE.prototype.getProperties = function(values)
{
	var properties = [];
	for(var propertyName in this)
	{
		if (typeof this[propertyName] == 'function')
			continue;

		var c = propertyName.charAt(0);
		if (c == '_')
			continue;

		properties.push(propertyName);
	}

	return properties;
}

IS_NONE.prototype.getNullTermdStr = function(str)
{
	// deal with null terminated string
	var idx = str.indexOf('\0');
	if (idx < 0)
		return str;

	return str.substr(0, idx);
}

IS_NONE.prototype.unpack = function(buf)
{
	if (!buf)
		return;

	var self = this;

	var data = Struct.Unpack(self._fmt, buf, 0);

	var properties = this.getProperties();

	for (var i = 0; i < properties.length; i++)
	{
		var t = data[i];

		if ((typeof data[i] == 'string') && (data[i].length > 0))
			t = self.getNullTermdStr(t);

		self[properties[i]] = t;
	}
}

IS_NONE.prototype.pack = function()
{
	var properties = this.getProperties();
	var values = [];
	for (var i = 0; i < properties.length; i++)
		values.push(this[properties[i]]);

	return Struct.Pack(this._fmt, values);
}

// Host information - sub packet
var IR_HINFO = function(buf)
{
	this._fmt = '32s6sBB';
	this.hname = '';
	this.track = '';
	this.flags = '';
	this.numconns = 0;

	this.unpack(buf);
}

inherits(IR_HINFO, IS_NONE);

var IR_HLR = function(buf)
{
	this._fmt = 'BBBB';
	this.size = 4;
	this.type = 252;
	this.reqi = 0;
	this.sp0 = 0;

	this.unpack(buf);
}

inherits(IR_HLR, IS_NONE);

var IR_HOS = function(buf)
{
	this._fmt = 'BBBB';
	this.size = 0;
	this.type = 0;
	this.reqi = 0;
	this.numhosts = 0;

	this.info = [];

	this.unpack(buf);
}

inherits(IR_HOS, IS_NONE);

IR_HOS.prototype.unpack = function(buf)
{
	if (!buf)
		return;

	var self = this;

	var data = Struct.Unpack(this._fmt, buf, 0);

	var properties = this.getProperties();

	// unpack the header
	for (var i = 0; i < properties.length; i++)
	{
		if (properties[i] == "info")
			continue;

		var t = data[i];

		// automatically deal with null terminated strings
		if ((typeof data[i] == 'string') && (data[i].length > 0))
			t = self.getNullTermdStr(t);

		self[properties[i]] = t;
	}

	// unpack the results
	for(var i = 0; i < self.numhosts; i++)
	{
		// Next packet start position
		var start = 4 + (i * 40);

		var c = new IR_HINFO(buf.subarray(start, start + 80));
		self.info.push(c);
	}
}

// IS_TINY is required to maintain the connection

var IS_TINY = function(buf)
{
	this._fmt = 'BBBB';
	this.size = 0;
	this.type = 0;
	this.reqi = 0;
	this.subt = 0;

	this.unpack(buf);
}

inherits(IS_TINY, IS_NONE);

// packet index

var packets = {
	// allows users to add new packets
	add: function(id, name, object)
	{
		this[id] = { name: name, object: object };
		this[name] = object;
	},

	// allows users to remove packets
	remove: function(id, name)
	{
		delete this[id];
		delete this[name];
	}
};

// add the required base packets

packets.add(0, 'IS_NONE', IS_NONE);
packets.add(3, 'IS_TINY', IS_TINY);
packets.add(252, 'IR_HLR', IR_HLR);
packets.add(253, 'IR_HOS', IR_HOS);

// client

var IR_Relay = function()
{
	this.transport = null;
}

inherits(IR_Relay, EventEmitter);

IR_Relay.prototype.connect = function()
{
	this.transport = new WebSocket('ws://isrelay.lfs.net:47474/connect');
	this.transport.binaryType = 'arraybuffer';
	this.transport.onopen = function(ctx)
	{
		return function()
		{
			ctx.emit('connected');
		};
	}(this);

	this.transport.onmessage = function(ctx)
	{
		return function(msg)
		{
			var data = new Uint8Array(msg.data);

			var q = packets[data[1]];

			if (!q)
			{
				console.log('Unknown packet - %d', data[1]);
				return;
			}

			var payload = new q.object(data);

			ctx.emit(q.name, payload);
		};
	}(this);

	this.transport.onclose = function(ctx)
	{
		return function()
		{
			ctx.emit('disconnected');
		};
	}(this);

	this.on('IS_TINY', function(ctx)
	{
		return function(data)
		{
			if (data.subt == 0)
			{
				var p = new packets.IS_TINY().pack();
				ctx.send(p);
				console.log('PING? PONG!');
			}
		};
	}(this));

}

IR_Relay.prototype.disconnect = function()
{
	this.transport.close();
}

IR_Relay.prototype.send = function(payload)
{
	var buf = new ArrayBuffer(payload.length);
	var data = new Uint8Array(buf);
	data.set(payload);

	this.transport.send(buf);
}

// external API

return {
	client: IR_Relay,
	packets: packets
};

})();
