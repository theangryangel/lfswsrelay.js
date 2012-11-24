// Additional, non-core packets
// You may pick and chose from these packets, allowing you to only add the
// packets you need to your application, minimizing the size of the library you
// need to include.
//
// May not include all possible packets.


// Multi purpose tiny packet

var IS_TINY = function(buf)
{
	this._fmt = '<BBBB';

	this.size = 4;
	this.type = 3;
	this.reqi = 0;
	this.subt = 0;

	this.unpack(buf);
};

lfswsrelay.inherits(IS_TINY, lfswsrelay.packets.IS_NONE);

lfswsrelay.packets.add(3, 'IS_TINY', IS_TINY);

// Muti purpose small packet

var IS_SMALL = function(buf)
{
	this._fmt = '<BBBBL';

	this.size = 8;
	this.type = 4;
	this.reqi = 0;
	this.subt = 0;

	this.uval = 0;

	this.unpack(buf);
};

lfswsrelay.inherits(IS_SMALL, lfswsrelay.packets.IS_NONE);

lfswsrelay.packets.add(4, 'IS_SMALL', IS_SMALL);

// New Connection

var IS_NCN = function(buf)
{
	this._fmt = '<BBBB24s24sBBBB';

	this.size = 56;
	this.type = 18;
	this.reqi = 0;
	this.ucid = 0;

	this.uname = '';
	this.pname = '';

	this.admin = 0;
	this.total = 0;
	this.flags = 0;
	this.sp3 = 0;

	this.unpack(buf);
};

lfswsrelay.inherits(IS_NCN, lfswsrelay.packets.IS_NONE);

lfswsrelay.packets.add(18, 'IS_NCN', IS_NCN);

// Connection Leaves

IS_CNL = function(buf)
{
	this._fmt = '<BBBBBBBB';

	this.size = 8;
	this.type = 19;
	this.reqi = 0;
	this.ucid = 0;

	this.reason = 0;
	this.total = 0;
	this.sp2 = 0;
	this.sp3 = 0;

	this.unpack(buf);
};

lfswsrelay.inherits(IS_CNL, lfswsrelay.packets.IS_NONE);

lfswsrelay.packets.add(19, 'IS_CNL', IS_CNL);

// New Player

var IS_NPL = function(buf)
{
	this._fmt = '<BBBBBBH24s8s4s16s4ABBBBlBBBB';

	this.size = 76;
	this.type = 21;
	this.reqi = 0;
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

	this.spare = 0;

	this.setf = 0;
	this.nump = 0;
	this.sp2 = 0;
	this.sp3 = 0;

	this.unpack(buf);
};

lfswsrelay.inherits(IS_NPL, lfswsrelay.packets.IS_NONE);

lfswsrelay.packets.add(21, 'IS_NPL', IS_NPL);

// Player Leaves

var IS_PLP = function(buf)
{
	this._fmt = '<BBBB';

	this.size = 4;
	this.type = 22;
	this.reqi = 0;
	this.plid = 0;

	this.unpack(buf);
};

lfswsrelay.inherits(IS_PLP, lfswsrelay.packets.IS_NONE);

lfswsrelay.packets.add(22, 'IS_PLP', IS_PLP);

