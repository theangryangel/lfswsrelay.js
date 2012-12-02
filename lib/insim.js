(function (lfswsrelay)
{


// Additional, non-core packets
// You may pick and chose from these packets, allowing you to only add the
// packets you need to your application, minimizing the size of the library you
// need to include.
//
// May not include all possible packets.

// IS_VER 
var IS_VER = function(buf)
{
	this._fmt = '<BBBB8s6sH';

	this.size = 20;
	this.type = 2;
	this.reqi = 0;
	this.zero = 0;

	this.version = '';
	this.product = '';
	this.insimver = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_VER, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(2, 'IS_VER', IS_VER);

// state flags
var ISS_GAME = 1; // in-game
var ISS_REPLAY = 2; // in spr
var ISS_PAUSED = 4; // paused
var ISS_SHIFTU = 8; // in shifu
var ISS_16 = 16; // unused
var ISS_SHIFTU_FOLLOW = 32; // shiftu follow
var ISS_SHIFTU_NO_OPT = 64; // shiftu no options
var ISS_SHOW_2D = 128; // showing 2d display?
var ISS_FRONT_END = 256; // entry screen
var ISS_MULTI = 512; // multiplayer mode
var ISS_MPSPEEDUP = 1024; // multiplayer speed up?
var ISS_WINDOWED = 2048; // lfs is in a window
var ISS_SOUND_MUTE = 4096; // audio is muted
var ISS_VIEW_OVERRIDE = 8192; // custom view
var ISS_VISIBLE = 16384; // insim buttons visible

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

// IS_STA 
var IS_STA = function(buf)
{
	this._fmt = '<BBBBiHBBBBBBBBBB6sBB';

	this.size = 28;
	this.type = 5;
	this.reqi = 0;
	this.zero = 0;

	this.replayspeed = 0;
	this.flags = 0;
	this.ingamecam = 0;
	this.viewplid = 0;

	this.nump = 0;
	this.numconns = 0;
	this.numfinished = 0;
	this.raceinprog = 0;

	this.qualmins = 0;
	this.racelaps = 0;
	this.spare2 = 0;
	this.spare3 = 0;

	this.track = 0;
	this.weather = 0;
	this.wind = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_STA, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(5, 'IS_STA', IS_STA);

// IS_SFP 
var IS_SFP = function(buf)
{
	this._fmt = '<BBBBHBB';

	this.size = 8;
	this.type = 7;
	this.reqi = 0;
	this.zero = 0;

	this.flag = 0;
	this.offon = 0;
	this.sp3 = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_SFP, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(7, 'IS_SFP', IS_SFP);

// IS_MOD 
var IS_MOD = function(buf)
{
	this._fmt = '<BBBBllll';

	this.size = 20;
	this.type = 15;
	this.reqi = 0;
	this.zero = 0;

	this.bits16 = 0;
	this.rr = 0;
	this.width = 0;
	this.height = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_MOD, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(15, 'IS_MOD', IS_MOD);

// IS_MSO 

var MSO_SYSTEM = 0; // system message
var MSO_USER = 1; // normal visible user message
var MSO_PREFIX = 2; // hidden message starting with special prefix (see ISI)
var MSO_O = 3; // hidden message typed on local pc with /o command

var IS_MSO = function(buf)
{
	this._fmt = '<BBBBBBBB128s';

	this.size = 136;
	this.type = 11;
	this.reqi = 0;
	this.zero = 0;

	this.ucid = 0;
	this.plid = 0;
	this.usertype = 0;
	this.textstart = 0;
	this.msg = '';

	this.unpack(buf);
}

lfswsrelay.inherits(IS_MSO, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(11, 'IS_MSO', IS_MSO);

// IS_III 
var IS_III = function(buf)
{
	this._fmt = '<BBBBBBBB64s';

	this.size = 72;
	this.type = 12;
	this.reqi = 0;
	this.zero = 0;

	this.ucid = 0;
	this.plid = 0;
	this.sp2 = 0;
	this.sp3 = 0;
	this.msg = '';

	this.unpack(buf);
}

lfswsrelay.inherits(IS_III, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(12, 'IS_III', IS_III);

// IS_ACR 
var IS_ACR = function(buf)
{
	this._fmt = '<BBBBBBBB64s';

	this.size = 72;
	this.type = 55;
	this.reqi = 0;
	this.zero = 0;

	this.ucid = 0;
	this.admin = 0;
	this.result = 0;
	this.sp3 = 0;
	this.msg = '';

	this.unpack(buf);
}

lfswsrelay.inherits(IS_ACR, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(55, 'IS_ACR', IS_ACR);

// IS_MST 
var IS_MST = function(buf)
{
	this._fmt = '<BBBB64s';

	this.size = 68;
	this.type = 13;
	this.reqi = 0;
	this.zero = 0;

	this.msg = '';

	this.unpack(buf);
}

lfswsrelay.inherits(IS_MST, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(13, 'IS_MST', IS_MST);

// IS_MSX 
var IS_MSX = function(buf)
{
	this._fmt = '<BBBB96s';

	this.size = 100;
	this.type = 39;
	this.reqi = 0;
	this.zero = 0;

	this.msg = '';

	this.unpack(buf);
}

lfswsrelay.inherits(IS_MSX, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(39, 'IS_MSX', IS_MSX);

// Message Sounds (for Sound byte)
var SND_SILENT = 0;
var SND_MESSAGE = 1;
var SND_SYSMESSAGE = 2;
var SND_INVALIDKEY = 3;
var SND_ERROR = 4;
var SND_NUM = 5;

// IS_MSL 
var IS_MSL = function(buf)
{
	this._fmt = '<BBBB128s';

	this.size = 132;
	this.type = 40;
	this.reqi = 0;
	this.sound = 0;

	this.msg = '';

	this.unpack(buf);
}

lfswsrelay.inherits(IS_MSL, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(40, 'IS_MSL', IS_MSL);

// IS_MTC 
var IS_MTC = function(buf)
{
	this._fmt = '<BBBBBBBB';

	this.size = 8;
	this.type = 14;
	this.reqi = 0;
	this.sound = 0;

	this.ucid = 0;
	this.plid = 0;
	this.sp2 = 0;
	this.sp3 = 0;

	this.text = '';

	this.unpack(buf);
}

lfswsrelay.inherits(IS_MTC, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(14, 'IS_MTC', IS_MTC);

IS_MTC.prototype.pack = function(values)
{
	var len = this.text.length + 1;

	if (len >= 128)
		len = 128;

	if ((len % 4) != 0)
		len += 4 - (len % 4);

	this._fmt += len.toString() + 's';

	this.size += len;

	var properties = this.getProperties();
	var values = [];
	for (i = 0; i < properties.length; i++)
		values.push(this[properties[i]]);

	return struct.pack(this._fmt, values);
}

// IS_SCH 
var IS_SCH = function(buf)
{
	this._fmt = '<BBBBBBBB';

	this.size = 8;
	this.type = 6;
	this.reqi = 0;
	this.zero = 0;

	this.charb = 0;
	this.flags = 0;
	this.spare2 = 0;
	this.spare3 = 0;


	this.unpack(buf);
}

lfswsrelay.inherits(IS_SCH, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(6, 'IS_SCH', IS_SCH);

// IS_ISM 
var IS_ISM = function(buf)
{
	this._fmt = '<BBBBBBBB32s';

	this.size = 40;
	this.type = 10;
	this.reqi = 0;
	this.zero = 0;

	this.host = 0;
	this.sp1 = 0;
	this.sp2 = 0;
	this.sp3 = 0;

	this.hname = '';

	this.unpack(buf);
}

lfswsrelay.inherits(IS_ISM, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(10, 'IS_ISM', IS_ISM);

// The Vote Actions
var VOTE_NONE = 0 // no vote
var VOTE_END = 1; // end race
var VOTE_RESTART = 2 ; // restart
var VOTE_QUALIFY = 3; // qualify
var VOTE_NUM = 4;

// IS_VTN 
var IS_VTN = function(buf)
{
	this._fmt = '<BBBBBBBB';

	this.size = 8;
	this.type = 16;
	this.reqi = 0;
	this.zero = 0;

	this.ucid = 0;
	this.action = 0;
	this.sp2 = 0;
	this.sp3 = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_VTN, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(16, 'IS_VTN', IS_VTN);

// IDs for allowed cars field for IS_PLC
// Both short and long names for convenience
var XF_GTI = XFG = 1
var XR_GT = XRG = 2
var XR_GT_TURBO = XRT = 4
var RB4_GT = RB4 = 8
var FXO_TURBO = FXO = 0x10
var LX4 = 0x20
var LX6	= 0x40
var MRT5 = 0x80
var UF_1000 = UF1 = 0x100
var RACEABOUT = RAC = 0x200
var FZ50 = FZ5 = 0x400
var FORMULA_XR = FOX = 0x800
var XF_GTR = XFR = 0x1000
var UF_GTR = UFR = 0x2000
var FORMULA_V8 = FO8 = 0x4000
var FXO_GTR = FXR = 0x8000
var XR_GTR = XRR = 0x10000
var FZ50_GTR = FZR = 0x20000
var BMW_SAUBER_F106 = BF1 = 0x40000
var FORMULA_BMW_FB02 = FBM = 0x80000

// IS_PLC 
var IS_PLC = function(buf)
{
	this._fmt = '<BBBBBBBBL';

	this.size = 12;
	this.type = 53;
	this.reqi = 0;
	this.zero = 0;

	this.ucid = 0;
	this.sp1 = 0;
	this.sp2 = 0;
	this.sp3 = 0;

	this.cars = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_PLC, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(53, 'IS_PLC', IS_PLC);

// IS_RST 
var IS_RST = function(buf)
{
	this._fmt = '<BBBBBBBB6sBBHHHHHH';

	this.size = 28;
	this.type = 17;
	this.reqi = 0;
	this.zero = 0;

	this.racelaps = 0;
	this.qualmins = 0;
	this.nump = 0;
	this.timing = 0;

	this.track = '';
	this.weather = 0;
	this.wind = 0;

	this.flags = 0;
	this.numnodes = 0;
	this.finish = 0;
	this.split1 = 0;
	this.split2 = 0;
	this.split3 = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_RST, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(17, 'IS_RST', IS_RST);

// IS_NCN 
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
}

lfswsrelay.inherits(IS_NCN, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(18, 'IS_NCN', IS_NCN);

// IS_CNL 
var IS_CNL = function(buf)
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
}

lfswsrelay.inherits(IS_CNL, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(19, 'IS_CNL', IS_CNL);

// IS_CPR 
var IS_CPR = function(buf)
{
	this._fmt = '<BBBB24s8s';

	this.size = 36;
	this.type = 20;
	this.reqi = 0;
	this.ucid = 0;

	this.pname = '';
	this.plate = '';

	this.unpack(buf);
}

lfswsrelay.inherits(IS_CPR, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(20, 'IS_CPR', IS_CPR);

// IS_NPL 
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
}

lfswsrelay.inherits(IS_NPL, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(21, 'IS_NPL', IS_NPL);

// IS_PLP 
var IS_PLP = function(buf)
{
	this._fmt = '<BBBB';

	this.size = 4;
	this.type = 22;
	this.reqi = 0;
	this.plid = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_PLP, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(22, 'IS_PLP', IS_PLP);

// IS_PLL 
var IS_PLL = function(buf)
{
	this._fmt = '<BBBB';

	this.size = 4;
	this.type = 23;
	this.reqi = 0;
	this.plid = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_PLL, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(23, 'IS_PLL', IS_PLL);

// IS_CRS 
var IS_CRS = function(buf)
{
	this._fmt = '<BBBB';

	this.size = 4;
	this.type = 41;
	this.reqi = 0;
	this.plid = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_CRS, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(41, 'IS_CRS', IS_CRS);

// IS_LAP 
var IS_LAP = function(buf)
{
	this._fmt = '<BBBBLLHHBBBB';

	this.size = 20;
	this.type = 24;
	this.reqi = 0;
	this.plid = 0;

	this.ltime = 0;
	this.etime = 0;

	this.lapsdone = 0;
	this.flags = 0;

	this.sp0 = 0;
	this.penalty = 0;
	this.numstops = 0;
	this.sp3 = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_LAP, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(24, 'IS_LAP', IS_LAP);

// IS_SPX 
var IS_SPX = function(buf)
{
	this._fmt = '<BBBBLLBBBB';

	this.size = 16;
	this.type = 25;
	this.reqi = 0;
	this.plid = 0;

	this.stime = 0;
	this.etime = 0;

	this.split = 0;
	this.penalty = 0;
	this.numstops = 0;
	this.sp3 = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_SPX, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(25, 'IS_SPX', IS_SPX);

// IS_PIT 
var IS_PIT = function(buf)
{
	this._fmt = '<BBBBHHBBBB4ALL';

	this.size = 24;
	this.type = 26;
	this.reqi = 0;
	this.plid = 0;

	this.lapsdone = 0;
	this.flags = 0;

	this.sp0 = 0;
	this.penalty = 0;
	this.numstops = 0;
	this.sp3 = 0;

	this.tyres = 0;

	this.work = 0;
	this.spare = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_PIT, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(26, 'IS_PIT', IS_PIT);

// IS_PSF 
var IS_PSF = function(buf)
{
	this._fmt = '<BBBBLL';

	this.size = 12;
	this.type = 27;
	this.reqi = 0;
	this.plid = 0;

	this.stime = 0;
	this.spare = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_PSF, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(27, 'IS_PSF', IS_PSF);

var PITLANE_EXIT = 0; // 0 - left pit lane
var PITLANE_ENTER = 1; // 1 - entered pit lane
var PITLANE_NO_PURPOSE = 2; // 2 - entered for no purpose
var PITLANE_DT = 3; // 3 - entered for drive-through
var PITLANE_SG = 4; // 4 - entered for stop-go

// IS_PLA 
var IS_PLA = function(buf)
{
	this._fmt = '<BBBBBBBB';

	this.size = 8;
	this.type = 28;
	this.reqi = 0;
	this.plid = 0;

	this.fact = 0;
	this.sp1 = 0;
	this.sp2 = 0;
	this.sp3 = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_PLA, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(28, 'IS_PLA', IS_PLA);

// IS_CCH 
var IS_CCH = function(buf)
{
	this._fmt = '<BBBBBBBB';

	this.size = 8;
	this.type = 29;
	this.reqi = 0;
	this.plid = 0;

	this.camera = '';
	this.sp1 = 0;
	this.sp2 = 0;
	this.sp3 = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_CCH, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(29, 'IS_CCH', IS_CCH);

// IS_PEN 
var IS_PEN = function(buf)
{
	this._fmt = '<BBBBBBBB';

	this.size = 8;
	this.type = 30;
	this.reqi = 0;
	this.plid = 0;

	this.oldpen = '';
	this.newpen = 0;
	this.reason = 0;
	this.sp3 = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_PEN, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(30, 'IS_PEN', IS_PEN);

// IS_TOC 
var IS_TOC = function(buf)
{
	this._fmt = '<BBBBBBBB';

	this.size = 8;
	this.type = 31;
	this.reqi = 0;
	this.plid = 0;

	this.olducid = 0;
	this.newucid = 0;
	this.sp2 = 0;
	this.sp3 = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_TOC, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(31, 'IS_TOC', IS_TOC);

var FLG_BLUE = 1; // given
var FLG_YELLOW = 1; // receiving

// IS_FLG 
var IS_FLG = function(buf)
{
	this._fmt = '<BBBBBBBB';

	this.size = 8;
	this.type = 32;
	this.reqi = 0;
	this.plid = 0;

	this.offon = 0;
	this.flag = 0;
	this.carbehind = 0;
	this.sp3 = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_FLG, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(32, 'IS_FLG', IS_FLG);

// IS_PFL 
var IS_PFL = function(buf)
{
	this._fmt = '<BBBBHH';

	this.size = 8;
	this.type = 33;
	this.reqi = 0;
	this.plid = 0;

	this.flags = 0;
	this.spare = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_PFL, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(33, 'IS_PFL', IS_PFL);

// IS_FIN 
var IS_FIN = function(buf)
{
	this._fmt = '<BBBBLLBBBBHH';

	this.size = 20;
	this.type = 34;
	this.reqi = 0;
	this.plid = 0;

	this.ttime = 0;
	this.btime = 0;

	this.spa = 0;
	this.numstops = 0;
	this.confirm = 0;
	this.spb = 0;

	this.lapsdone = 0;
	this.flags = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_FIN, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(34, 'IS_FIN', IS_FIN);

var CONF_MENTIONED = 1;
var CONF_CONFIRMED = 2;
var CONF_PENALTY_DT	= 4;
var CONF_PENALTY_SG	= 8;
var CONF_PENALTY_30	= 16;
var CONF_PENALTY_45	= 32;
var CONF_DID_NOT_PIT = 64;

var CONF_DISQ = (CONF_PENALTY_DT | CONF_PENALTY_SG | CONF_DID_NOT_PIT);
var CONF_TIME = (CONF_PENALTY_30 | CONF_PENALTY_45);

// IS_RES 
var IS_RES = function(buf)
{
	this._fmt = '<BBBB24s24s8s4sLLBBBBHHBBH';

	this.size = 84;
	this.type = 35;
	this.reqi = 0;
	this.plid = 0;

	this.uname = '';
	this.pname = '';
	this.plate = '';
	this.cname = '';

	this.ttime = 0;
	this.btime = 0;

	this.spa = 0;
	this.numstops = 0;
	this.confirm = 0;
	this.spb = 0;

	this.lapsdone = 0;
	this.flags = 0;

	this.resultnum = 0;
	this.numres = 0;
	this.pseconds = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_RES, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(35, 'IS_RES', IS_RES);

// IS_REO 
var IS_REO = function(buf)
{
	this._fmt = '<BBBB32A';

	this.size = 36;
	this.type = 36;
	this.reqi = 0;
	this.nump = 0;

	this.plid = [];

	this.unpack(buf);
}

lfswsrelay.inherits(IS_REO, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(36, 'IS_REO', IS_REO);

// IS_AXI 
var IS_AXI = function(buf)
{
	this._fmt = '<BBBBBBH32s';

	this.size = 40;
	this.type = 43;
	this.reqi = 0;
	this.zero = 0;

	this.axstart = 0;
	this.numcp = 0;
	this.numo = 0;

	this.lname = '';

	this.unpack(buf);
}

lfswsrelay.inherits(IS_AXI, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(43, 'IS_AXI', IS_AXI);

// IS_AXO 
var IS_AXO = function(buf)
{
	this._fmt = '<BBBB';

	this.size = 4;
	this.type = 44;
	this.reqi = 0;
	this.plid = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_AXO, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(44, 'IS_AXO', IS_AXO);

// IS_AXO 
var IS_AXO = function(buf)
{
	this._fmt = '<BBBB';

	this.size = 4;
	this.type = 44;
	this.reqi = 0;
	this.plid = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_AXO, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(44, 'IS_AXO', IS_AXO);

// NodeLap
var IS_NODELAP = function(buf)
{
	this._fmt = '<HHBB';

	this.node = 0;
	this.lap = 0;
	this.plid = 0;
	this.position = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_NODELAP, lfswsrelay.packets.IS_NONE);

// IS_NLP 
var IS_NLP = function(buf)
{
	this.size = 0;
	this.type = 37;
	this.reqi = 0;
	this.nump = 0;

	this.info = [];

	this.unpack(buf);
}

lfswsrelay.inherits(IS_NLP, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(37, 'IS_NLP', IS_NLP);

/*
IS_NLP.prototype.unpack = function(buf)
{
	var self = this;

	// Base properties
	var data = struct.unpack(self._fmt, buf, 0);

	var properties = this.getProperties();
	for (i = 0; i < properties.length; i++)
	{
		if (properties[i] == "info")
			continue;

		self[properties[i]] = data[i];
	}

	// NodeLap unpacking
	for(i = 0; i < self.numc; i++)
	{
		// Next packet start position
		var start = 4 + (i * 6);
		var tbuf = buf.slice(start, (start + 28));

		var c = new IS_NODELAP;
		c.unpack(tbuf);

		self.info.push(c);
	}
}
*/

// CompCar

// CompCar info flags
var CCI_BLUE = 1;
var CCI_YELLOW = 2;
var CCI_LAG = 32;
var CCI_FIRST = 64;
var CCI_LAST = 128;

var IS_COMPCAR = function(buf)
{
	this._fmt = '<HHBBBBlllHHHh';

	this.node = 0;
	this.lap = 0;
	this.plid = 0;
	this.position = 0;
	this.info = 0;
	this.sp3 = 0;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.speed = 0;
	this.direction = 0;
	this.heading = 0;
	this.angvel = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_COMPCAR, lfswsrelay.packets.IS_NONE);

// IS_MCI 
var IS_MCI = function(buf)
{
	this._fmt = '<BBBB';

	// Variable size packet
	// 4 + (numc * 28)
	this.size = 0;
	this.type = 38;
	this.reqi = 0;
	this.numc = 0;

	this.compcar = [];

	this.unpack(buf);
}

lfswsrelay.inherits(IS_MCI, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(38, 'IS_MCI', IS_MCI);

IS_MCI.prototype.pack = function()
{
	throw new Error('Unsupported at this time');
}

/*
IS_MCI.prototype.unpack = function(buf)
{
	var self = this;

	// Base properties
	var data = struct.unpack(self._fmt, buf, 0);

	var properties = this.getProperties();
	for (i = 0; i < properties.length; i++)
	{
		if (properties[i] == "compcar")
			continue;

		self[properties[i]] = data[i];
	}

	// Compcar unpacking
	for(i = 0; i < self.numc; i++)
	{
		// Next packet start position
		var start = 4 + (i * 28);
		var tbuf = buf.slice(start, (start + 28));

		var c = new IS_COMPCAR;
		c.unpack(tbuf);

		self.compcar.push(c);
	}
}
*/

// IS_CARCONTACT 
var IS_CARCONTACT = function(buf)
{
	this._fmt = '<BBBcBBBBBBcchh';

	this.plid = 0;
	this.info = 0;
	this.sp2 = 0;
	this.steer = 0;

	this.thrbrk = 0;
	this.cluhan = 0;
	this.gearsp = 0;
	this.speed = 0;

	this.direction = 0;
	this.heading = 0;
	this.accelf = 0;
	this.accelr = 0;

	this.x = 0;
	this.y = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_CARCONTACT, lfswsrelay.packets.IS_NONE);

// IS_CON 
var IS_CON = function(buf)
{
	this._fmt = '<BBBB';

	this.size = 40;
	this.type = 50;
	this.reqi = 0;
	this.numc = 0;

	this.spclose = 0;
	this.time = 0;

	this.a = null;
	this.b = null;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_CON, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(50, 'IS_CON', IS_CON);

/*
IS_CON.prototype.unpack = function(buf)
{
	var self = this;

	// Base properties
	var data = struct.unpack(self._fmt, buf, 0);
	var properties = this.getProperties();
	var start = 8;

	for (i = 0; i < properties.length; i++)
	{
		if (properties[i] == "a" || properties[i] == "b")
		{
			var tbuf = buf.slice(start, (start + 16));
			var c = new IS_CARCONTACT;
			c.unpack(tbuf);
			self[properties[i]] = c;

			start += 16;
			continue;
		}

		self[properties[i]] = data[i];
	}
}
*/

var IS_CARCONTOBJ = function(buf)
{
	this._fmt = '<BBBBhh';

	this.direction = 0;
	this.heading = 0;
	this.speed = 0;
	this.sp3 = 0;

	this.x = 0;
	this.y = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_CARCONTOBJ, lfswsrelay.packets.IS_NONE);

// IS_OBH OBHFlags
var OBH_LAYOUT = 1;
var OBH_CAN_MOVE = 2;
var OBH_WAS_MOVING = 4;
var OBH_ON_SPOT = 8;

// IS_OBH 
var IS_OBH = function(buf)
{
	// TODO - FINISH
	this._fmt = '<BBBBHH';

	this.size = 24;
	this.type = 51;
	this.reqi = 0;
	this.plid = 0;

	this.spclose = 0;
	this.time = 0;

	this.c = null;

	this.x = 0;
	this.y = 0;

	this.sp0;
	this.sp1 = 0;

	this.index = 0;
	this.obhflags = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_OBH, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(51, 'IS_OBH', IS_OBH);

// IS_HLV 
var IS_HLV = function(buf)
{
	this._fmt = '<BBBBBBH';

	this.size = 16;
	this.type = 52;
	this.reqi = 0;
	this.plid = 0;

	this.hlvc = 0;
	this.sp1 = 0;
	this.time = 0;

	this.c = null;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_HLV, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(52, 'IS_HLV', IS_HLV);

var HLVC_GROUND = 0;
var HLVC_WALL = 1;
var HLVC_SPEED = 2;

/*
IS_HLV.prototype.unpack = function(buf)
{
	var self = this;

	// Base properties
	var data = struct.unpack(self._fmt, buf, 0);
	var properties = this.getProperties();
	var start = 8;

	for (i = 0; i < properties.length; i++)
	{
		if (properties[i] == "c")
		{
			var tbuf = buf.slice(start, (start + 8));
			var c = new IS_CARCONTOBJ;
			c.unpack(tbuf);
			self[properties[i]] = c;

			start += 16;
			continue;
		}

		self[properties[i]] = data[i];
	}

	this.unpack(buf);
}
*/

// ObjectInfo
var IS_OBJECTINFO = function(buf)
{
	this._fmt = '<hhcBBB';

	this.x = 0;
	this.y = 0;
	this.zchar = 0;
	this.flags = 0;
	this.index = 0;
	this.heading = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_OBJECTINFO, lfswsrelay.packets.IS_NONE);

// IS_AXM pmoaction flags
var PMO_LOADING_FILE = 0;
var PMO_ADD_OBJECTS = 1;
var PMO_DEL_OBJECTS = 2;
var PMO_CLEAR_ALL = 3;
var PMO_NUM = 4;

// IS_AXM 
var IS_AXM = function(buf)
{
	this._fmt = '<hhcBBB';

	this.size = 0;
	this.type = 54;
	this.reqi = 0;
	this.numo = 0;

	this.ucid = 0;
	this.pmoaction = 0;
	this.pmoflags = 0;
	this.sp3 = 0;

	this.info = [];

	this.unpack(buf);
}

lfswsrelay.inherits(IS_AXM, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(54, 'IS_AXM', IS_AXM);

/*
IS_AXM.prototype.unpack = function(buf)
{
	var self = this;

	// Base properties
	var data = struct.unpack(self._fmt, buf, 0);
	var properties = this.getProperties();
	var start = 8;

	for (i = 0; i < properties.length; i++)
	{
		if (properties[i] == "info")
			continue;

		self[properties[i]] = data[i];
	}

	// ObjectInfo unpacking
	for(i = 0; i < self.numo; i++)
	{
		// Next packet start position
		var start = 8 + (i * 8);
		var tbuf = buf.slice(start, (start + 28));

		var c = new IS_OBJECTINFO;
		c.unpack(tbuf);

		self.info.push(c);
	}
}
*/

var VIEW_FOLLOW = 0; // arcade
var VIEW_HELI = 1; //helicopter
var VIEW_CAM = 2; // tv camera
var VIEW_DRIVER = 3; // cockpit
var VIEW_CUSTOM = 4; // - custom

// IS_SCC 
var IS_SCC = function(buf)
{
	this._fmt = '<BBBBBBBB';

	this.size = 8;
	this.type = 8;
	this.reqi = 0;
	this.zero = 0;

	// set ingamecam or viewplid to 255 to leave that option unchanged
	this.viewplid = 255;
	this.ingamecam = 255;

	this.sp2 = 0;
	this.sp3 = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_SCC, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(8, 'IS_SCC', IS_SCC);

// IS_CPP 
var IS_CPP = function(buf)
{
	this._fmt = '<BBBB3lHHHBBfHH';

	this.size = 32;
	this.type = 8;
	this.reqi = 0;
	this.zero = 0;

	this.h = 0;
	this.p = 0;
	this.r = 0;

	this.viewplid = 0;
	this.ingamecam = 0;

	this.fov = 0;

	this.time = 0;

	// valid state flags that can be set -
	// ISS_SHIFTU - shiftu mode
	// ISS_SHIFTU_FOLLOW - shiftu follow view
	// ISS_VIEW_OVERRIDE - override user view
	this.flags = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_CPP, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(9, 'IS_CPP', IS_CPP);

// IS_RIP 
var IS_RIP = function(buf)
{
	this._fmt = '<BBBBBBBBLL64s';

	this.size = 80;
	this.type = 48;
	this.reqi = 0;
	this.error = 0;

	this.mpr = 0;
	this.paused = 0;
	this.options = 0;
	this.sp3 = 0;

	this.ctime = 0;
	this.ttime = 0;

	this.rname = '';

	this.unpack(buf);
}

lfswsrelay.inherits(IS_RIP, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(48, 'IS_RIP', IS_RIP);

// IS_SSH 
var IS_SSH = function(buf)
{
	this._fmt = '<BBBBBBBB32s';

	this.size = 40;
	this.type = 49;
	this.reqi = 0;
	this.error = 0;

	this.sp0 = 0;
	this.sp1 = 0;
	this.sp2 = 0;
	this.sp3 = 0;

	this.rname = '';

	this.unpack(buf);
}

lfswsrelay.inherits(IS_SSH, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(49, 'IS_SSH', IS_SSH);

// IS_BFN subt
var BFN_DEL_BTN = 0;
var BFN_CLEAR = 1;
var BFN_USER_CLEAR = 2;
var BFN_REQUEST = 3;

// IS_BFN 
var IS_BFN = function(buf)
{
	this._fmt = '<BBBBBBBB';

	this.size = 8;
	this.type = 42;
	this.reqi = 0;
	this.subt = 0;

	this.ucid = 0;
	this.clickid = 0;
	this.inst = 0;
	this.sp3 = 0;

	this.unpack(buf);
}

lfswsrelay.inherits(IS_BFN, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(42, 'IS_BFN', IS_BFN);

// Styles for buttons
var ISB_C1 = 1; // standard button
var ISB_C2 = 2; // interface colour
var ISB_C4 = 4; // TODO
var ISB_CLICK = 8; // click 
var ISB_LIGHT = 16; // light button
var ISB_DARK = 32; // dark button
var ISB_LEFT = 64; // left align text
var ISB_RIGHT = 128; // right align text

// Colors and their "normal" LFS usage
var ISB_COL_LIGHTGREY = 0; // not user editable
var ISB_COL_YELLOW = 1; // title colour
var ISB_COL_BLACK = 2; // unselected text
var ISB_COL_WHITE = 3; // selectex text
var ISB_COL_GREEN = 4; // ok
var ISB_COL_RED = 5; // cancel
var ISB_COL_PALEBLUE = 6; // text string
var ISB_COL_GREY = 7; // unavailable

// IS_BTN 
var IS_BTN = function(buf)
{
	this._fmt = '<BBBBBBBBBBBB';

	this.size = 12;
	this.type = 45;
	this.reqi = 0;
	this.ucid = 0;

	this.clickid = 0;
	this.inst = 0;
	this.bstyle = 0;
	this.typein = 0;

	this.l = 0;
	this.t = 0;
	this.w = 0;
	this.h = 0;

	this.text = '';

	this.unpack(buf);
}

lfswsrelay.inherits(IS_BTN, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(45, 'IS_BTN', IS_BTN);

IS_BTN.prototype.pack = function(values)
{
	var len = this.text.length + 1;

	if (len > 240)
		len = 240;

	if ((len % 4) != 0)
		len += 4 - (len % 4);

	this._fmt += len.toString() + 's';

	this.size += len;

	var properties = this.getProperties();
	var values = [];
	for (i = 0; i < properties.length; i++)
		values.push(this[properties[i]]);

	return struct.pack(this._fmt, values);
}

// IS_BTC  click types
var ISB_LMB = 1; // left mouse button click
var ISB_RMB = 2; // right mount button click
var ISB_CTRL = 3; // ctrl + left button click
var ISB_SHIFT = 4; // shift + left button click

// IS_BTC 
var IS_BTC = function(buf)
{
	this._fmt = '<BBBBBBBB';

	this.size = 8;
	this.type = 46;
	this.reqi = 0;
	this.ucid = 0;

	this.clickid = 0;
	this.inst = 0;
	this.cflags = 0;
	this.sp3 = 0;

	this.rname = '';

	this.unpack(buf);
}

lfswsrelay.inherits(IS_BTC, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(46, 'IS_BTC', IS_BTC);

// IS_BTT 
var IS_BTT = function(buf)
{
	this._fmt = '<BBBBBBBB96s';

	this.size = 104;
	this.type = 47;
	this.reqi = 0;
	this.ucid = 0;

	this.clickid = 0;
	this.inst = 0;
	this.typein = 0;
	this.sp3 = 0;

	this.text = '';

	this.unpack(buf);
}

lfswsrelay.inherits(IS_BTT, lfswsrelay.packets.IS_NONE);
lfswsrelay.packets.add(47, 'IS_BTT', IS_BTT);

})(lfswsrelay);
