(function(lfswsrelay)
{

if (!lfswsrelay)
	throw new Error('lfswsrelay.js could not be found!');

if (lfswsrelay.state)
	throw new Error('Another plugin has already claimed state! Have you included it twice?');

// Optional state management plugin

// StateBase - "Abstract class"
var StateBase = function() {};
StateBase.prototype = {
	'fromPkt': function(pkt)
	{
		var props = pkt.getProperties();

		for (var i in props)
		{
			var propK = props[i];
			var propV = pkt[propK];

			if ((typeof propV != 'function') && (this[i] !== 'undefined'))
				this[propK] = propV;
		}
	}
};

// Connection State
var StateConn = function(pkt)
{
	this.ucid = 0;
	this.admin = false;
	this.uname = '';
	this.flags = 0;

	this.plid = 0;

	if (pkt)
		this.fromPkt(pkt);
};
lfswsrelay.inherits(StateConn, StateBase);

// Player state
var StatePlyr = function(pkt)
{
	this.plid = 0;
	
	this.ucid = 0;
	this.ptype = 0;
	this.flags = 0;
	
	this.pname = '';
	this.plate = '';
	this.cname = '';
	this.sname = '';
	this.tyres = 0;
	
	this.h_mass = 0;
	this.h_tres = 0;
	this.model = 0;
	this.pass = 0;
	this.setf = 0;
	this.pitting = false; // tele-pitting
	this.pitstop = false; // normal pit - i.e. in game
	
	this.node = 0;
	this.lap = 0;
	this.position = 0;
	this.position_original = 0; // starting position
	this.info = 0;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.speed = 0;
	this.direction = 0;
	this.heading = 0;
	this.angvel = 0;
	
	this.ttime = 0;
	this.btime = 0;
	this.numstops = 0;
	
	// array of pit stops
	this.pitstops = [];
	
	this.lapsdone = 0;
	this.resultnum = 0;
	this.pseconds = 0;
	
	this.penalty = 0; // current penalty, if any
	this.ltime = 0;
	this.btime = 0;
	this.etime = 0;
	this.stime = 0;
	
	this.finalresult = false; // is the final result
	this.finished = true; // finished, but not final result
	
	// setup from IS_NPL
	if (pkt)
		this.fromPkt(pkt);
};
lfswsrelay.inherits(StatePlyr, StateBase);

var State = function()
{
	var self = this;

	// host state
	self.hname = ''; // hostname

	self.replayspeed = 1;
	self.flags = 0; // state flags
	self.ingamecam = 0;
	self.viewplid = 0; // currently viewing this plid - for the relay this will always be 0

	self.raceinprog = 0; // 0 = no race, 1 = race, 2 = qualifying
	self.qualmins = 0; // number of qualifying mins
	self.racelaps = 0; // laps

	self.track = ''; // short trackname
	self.weather = ''; // 0-2
	self.wind = ''; // 0-2, none-weak-strong

	self.axstart = 0; // ax start node
	self.numcp = 0; // number of cps
	self.numo = 0; // number of objects
	self.lname = ''; // layout name, if any
	self.nump = 0; // number of players

	// connections
	// sparse array index by ucid
	self.conns = [];

	// players
	// sparse array indexed by plid
	self.plyrs = [];

	// helper hooks array
	self.hooks = {
		'selected': 'onSelected',

		'IS_STA': 'onIS_STA',
//		'IS_RST': 'onIS_RST',
//		'IS_AXI': 'onIS_AXI',
//		'IS_ISM': 'onIS_ISM',

		'IS_NCN': 'onIS_NCN',
		'IS_CNL': 'onIS_CNL',
		'IS_CPR': 'onIS_CPR',

//		'IS_NPL': 'onIS_NPL',
//		'IS_PIT': 'onIS_PIT',
//		'IS_PSF': 'onIS_PSF',
//		'IS_PLP': 'onIS_PLP',
//		'IS_PLL': 'onIS_PLL',
//		'IS_TOC': 'onIS_TOC',
//		'IS_FIN': 'onIS_FIN',
//		'IS_RES': 'onIS_RES',
//		'IS_LAP': 'onIS_LAPSPX',
//		'IS_SPX': 'onIS_LAPSPX',
//		'IS_MCI': 'onIS_MCI',
//		'IS_REO': 'onIS_REO'
	};

	self.requestState = function(client)
	{
		// We need to send several IS_TINY's with different subtypes to
		// determine the current state.
		var subts = [ 7, 10, 13, 14, 20, 18 ];

		for (var i in subts)
		{
			var p = new lfswsrelay.packets.IS_TINY();
			p.reqi = 1;
			p.subt = subts[i];

			client.send(p.pack());
		}
	};

	self.onSelected = function(hostname, client)
	{
		self.hname = hostname;
		self.requestState(client);
	};

	self.onIS_STA = function(pkt, client)
	{
		self.fromPkt(pkt);
	};

	// connection specific hooks
	self.onIS_NCN = function(pkt, client)
	{
		// new connection
		var c = new StateConn(pkt);
		self.conns[c.ucid] = c;
	};

	self.onIS_CNL = function(pkt, client)
	{
		// connection leaves
		if (!self.conns[pkt.ucid])
			return;

		if ((self.conns[pkt.ucid].plid > 0) && (self.plyrs[self.conns[pkt.ucid].plid]))
			delete self.plyrs[self.conns[pkt.ucid].plid];

		delete self.conns[pkt.ucid];
	};

	self.onIS_CPR = function(pkt, client)
	{
		// connection rename
		if (!self.conns[pkt.ucid])
			return;

		self.conns[pkt.ucid].pname = pkt.pname;
		self.conns[pkt.ucid].plate = pkt.plate;
	};

	// helper function
	// sort of like currying, but not actually.
	self.proxy = function(fn, client)
	{
		var client = client || this;

		return function(pkt)
		{
			fn(pkt, client);
		};
	};

	// functions
	self.init = function(client)
	{
		client.state = self;

		for (var i in self.hooks)
			client.on(i, self.proxy(self[self.hooks[i]], client));
	};
};
lfswsrelay.inherits(State, StateBase);

// public api, register with an instance of relay
// 	relay.use(lfswslrelay.state());
// now access all informtion via relay.state.X, where X is a state item
// or via custom events
lfswsrelay.state = function()
{
	return new State();
};

lfswsrelay.inherits(lfswsrelay.state, StateBase);

})(lfswsrelay);
