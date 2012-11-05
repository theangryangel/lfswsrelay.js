var IR_Pkt = function(buf)
{
	this._fmt = '';
}

IR_Pkt.prototype.getProperties = function(values)
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

IR_Pkt.prototype.getNullTermdStr = function(str)
{
	// deal with null terminated string
	var idx = str.indexOf('\0');
	if (idx < 0)
		return str;

	return str.substr(0, idx);
}

IR_Pkt.prototype.unpack = function(buf)
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

IR_Pkt.prototype.pack = function()
{
	var properties = this.getProperties();
	var values = [];
	for (var i = 0; i < properties.length; i++)
		values.push(this[properties[i]]);

	return Struct.Pack(this._fmt, values);
}

// Host information - sub packet
var IR_Hinfo = function(buf)
{
	this._fmt = '32s6sBB';
	this.hname = '';
	this.track = '';
	this.flags = '';
	this.numconns = 0;

	this.unpack(buf);
}

inherits(IR_Hinfo, IR_Pkt);

var IR_HLR = function(buf)
{
	this._fmt = 'BBBB';
	this.size = 4;
	this.type = 252;
	this.reqi = 0;
	this.sp0 = 0;

	this.unpack(buf);
}

inherits(IR_HLR, IR_Pkt);

var IR_Hos = function(buf)
{
	this._fmt = 'BBBB';
	this.size = 0;
	this.type = 0;
	this.reqi = 0;
	this.numhosts = 0;

	this.info = [];

	this.unpack(buf);
}

inherits(IR_Hos, IR_Pkt);

IR_Hos.prototype.unpack = function(buf)
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

		var c = new IR_Hinfo(buf.subarray(start, start + 80));
		self.info.push(c);
	}
}

var IS_TINY = function(buf)
{
	this._fmt = 'BBBB';
	this.size = 0;
	this.type = 0;
	this.reqi = 0;
	this.subt = 0;

	this.unpack(buf);
}

inherits(IS_TINY, IR_Pkt);

var IR_Relay = function()
{
	this.transport = null;

	this.packets = {
		3: { 'name': 'IS_TINY', 'object': IS_TINY },
		253: { 'name': 'IR_HOS', 'object': IR_Hos }
	};
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

			var q = ctx.packets[data[1]];

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
				var p = new IS_TINY().pack();
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

