inherits = function(ctor, superCtor)
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
};

function EventEmitter() {}

EventEmitter.prototype.on = function (name, callback) {
	if (!this.hasOwnProperty("_handlers")) this._handlers = {};
	var handlers = this._handlers;
	if (!handlers.hasOwnProperty(name)) handlers[name] = [];
	var list = handlers[name];
	list.push(callback);
};

EventEmitter.prototype.emit = function (name/*, args...*/) {
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

EventEmitter.prototype.off = function (name, callback) {
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

