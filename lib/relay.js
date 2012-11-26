var lfswsrelay = (function ()
{

// utility inhertiance function
// originally from NodeJs' util.inherits
var inherits = function(ctor, superCtor)
{
	ctor.super_ = superCtor;
	ctor.prototype = Object.create(superCtor.prototype, {
		constructor: {
			value: ctor,
		enumerable: false,
		writable: true,
		configurable: true
		}
	});
}

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

	var data = struct.unpack(self._fmt, buf, 0);

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

	return struct.pack(this._fmt, values);
}

var IR_ARQ = function(buf)
{
	this._fmt = 'BBBB';
	this.size = 4;
	this.type = 250;
	this.reqi = 0;
	this.sp0 = 0;

	this.unpack(buf);
}

inherits(IR_ARQ, IS_NONE);

var IR_ARP = function(buf)
{
	this._fmt = 'BBBB';
	this.size = 4;
	this.type = 251;
	this.reqi = 0;
	this.admin = 0;

	this.unpack(buf);
}

inherits(IR_ARP, IS_NONE);

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

	var data = struct.unpack(this._fmt, buf, 0);

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

		var c = new IR_HINFO(buf.slice(start, start + 80));
		self.info.push(c);
	}
}

var IR_SEL = function(buf)
{
	this._fmt = 'BBBB32s16s16s';
	this.size = 68;
	this.type = 254;
	this.reqi = 0;
	this.zero = 0;

	this.hname = '';
	this.admin = '';
	this.spec = '';

	this.unpack(buf);
}

inherits(IR_SEL, IS_NONE);

var IR_ERR = function(buf)
{
	this._fmt = 'BBBB';
	this.size = 4;
	this.type = 255;
	this.reqi = 0;
	this.errno = 0;

	this.unpack(buf);
}

inherits(IR_ERR, IS_NONE);

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
packets.add(250, 'IR_ARQ', IR_ARQ);
packets.add(251, 'IR_ARP', IR_ARP);
packets.add(252, 'IR_HLR', IR_HLR);
packets.add(253, 'IR_HOS', IR_HOS);
packets.add(254, 'IR_SEL', IR_SEL);
packets.add(255, 'IR_ERR', IR_ERR);

// client

var IR_Relay = function()
{
	this.transport = null;
}

// on, emit and off originally from NodeJs' EventEmitter
IR_Relay.prototype.on = function (name, callback)
{
	if (!this.hasOwnProperty("_handlers")) this._handlers = {};
	var handlers = this._handlers;
	if (!handlers.hasOwnProperty(name)) handlers[name] = [];
	var list = handlers[name];
	list.push(callback);
}

IR_Relay.prototype.emit = function (name/*, args...*/)
{
	if (!this.hasOwnProperty("_handlers")) return;
	var handlers = this._handlers;
	if (!handlers.hasOwnProperty(name)) return;
	var list = handlers[name];
	var args = Array.prototype.slice.call(arguments, 1);
	for (var i = 0, l = list.length; i < l; i++) {
		if (!list[i]) continue;
		list[i].apply(this, args);
	}
}

IR_Relay.prototype.off = function (name, callback)
{
	if (!this.hasOwnProperty("_handlers")) return;
	var handlers = this._handlers;
	if (!handlers.hasOwnProperty(name)) return;
	var list = handlers[name];
	var index = list.indexOf(callback);
	if (index < 0) return;
	list[index] = false;
	if (index === list.length - 1) {
		while (index >= 0 && !list[index]) {
			list.length--;
			index--;
		}
	}
};


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
			var data = msg.data;
			var id = new Uint8Array(data, 1, 1)[0];

			var q = packets[id];

			if (!q)
			{
				console.log('Unknown packet - %d', id);
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
	this.transport.send(payload);
}

IR_Relay.prototype.isConnected = function()
{
	return ((this.transport !== null) && (this.transport.readyState == 1));
}

// higher level API functions
IR_Relay.prototype.select = function(hostname, specpass, adminpass)
{
	if (!hostname)
		throw new Error('Missing hostname! Cannot select blank host.');

	var pkt = new packets.IR_SEL();
	pkt.hname = hostname;
	pkt.spec = (specpass ? specpass : '');
	pkt.adminpass = (adminpass ? adminpass : '');

	this.send(pkt.pack());

	this.emit('selected', hostname);
}

// external API

return {
	client: IR_Relay,
	packets: packets,

	inherits: inherits
};

})();
