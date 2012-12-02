(function(lfswsrelay)
{

if (!lfswsrelay)
	return;

if (lfswsrelay.state)
	throw new Error('Another plugin has already claimed state! Have you included it twice?');

// Optional state management plugin
var methods = {

	init: function(client)
	{
		console.log('hello from state plugin');
	}

};

lfswsrelay.state = function(client)
{
	if (client)
		this.init(client);
}

lfswsrelay.state.prototype = methods;

})(lfswsrelay);
