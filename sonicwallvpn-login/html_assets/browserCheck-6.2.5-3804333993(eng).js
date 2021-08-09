

function lib_bwcheck() {
	this.ver = navigator.appVersion;
	this.agent = navigator.userAgent;
	this.dom = (document.getElementById) ? true : false;
	this.version = "";
	this.rev = "";
	this.sf = this.op5 = this.op8x = this.op9 = false;
	var ix = this.ver.indexOf("MSIE ");
	if (ix > -1 && this.dom) {
		this.ie = true;
		var endIx = this.ver.indexOf(";", ix);
		this.version = this.ver.substring(ix+5, endIx);
		var verMajor = parseInt(this.version);
		this.ie5x = (verMajor == 5);
		this.ie55 = (this.ver.substr(ix,3) == "5.5");
		this.ie6 = (verMajor >= 6);
		this.ie7 = (verMajor >= 7);
		this.ie8 = (verMajor >= 8);
		this.ie9 = (verMajor >= 9);
		this.ie10 = (verMajor >= 10);
	}
	else if(document.all && !this.dom){
		this.ie = true;
		this.ie4x = true;
	}

	ix = this.ver.indexOf(") like Gecko");
	if (ix > -1 && this.dom) {
		this.ie = true;
		var begIx = this.ver.indexOf("rv:");
		this.version = this.ver.substring(begIx + 3, ix);
		var verMajor = parseInt(this.version);
		this.ie11 = (verMajor >= 11);
	}

	ix = this.ver.indexOf("Edge/index.html");
	if (ix > -1 && this.dom) {
		this.ie = true;
		var begIx = ix+5;
		this.version = this.ver.substring(begIx);
		var verMajor = parseInt(this.version);
		this.ieEdge12 = (verMajor >= 12);
	}

	this.mac = (this.agent.indexOf("Mac") > -1);

	ix = this.ver.indexOf("Opera ");
	if (ix > -1) {
		this.op5 = (parseInt(this.ver.substr(ix+6)) >= 5);
	} else if (this.agent.indexOf("Opera/index.html") > -1) {
		this.op9 = (parseInt(this.ver) >= 9);
	} else {
		ix = this.agent.indexOf("Opera ");
		if (ix > -1) {
			this.op8x = (this.agent.substr(ix+6,2) == "8.");
		}
	}
	if (this.agent.indexOf("Safari") > -1) {
		this.sf = true;
		ix = this.agent.indexOf("Version/index.html");
		if (ix > -1) {
			this.sf3 = true;
			this.version = this.agent.substr(ix+8);
			ix = this.version.indexOf(" ");
			if (ix > 0) {
				this.version = this.version.substr(0,ix);
				this.sf30 = (this.version.substr(0,3) == "3.0");
				this.sf3x = (this.version.substr(0,2) == "3.");
			}
		} else {
			ix = this.agent.indexOf("Safari/index.html");
			if (ix > -1) {
				this.sf2 = true;
				this.version = this.agent.substr(ix+7,6);
				this.sf2x = (this.version.substr(0,5) == "419.3");
			}
		}

		this.chrome = (this.agent.indexOf("Chrome") > -1);
	}

	this.ns6 = !(this.sf || this.op8x || this.op9 || this.ie) && this.dom && (parseInt(this.ver) >= 5);
	if (this.ns6) {
		var endIx = this.agent.indexOf(") Gecko");
		var begIx = this.agent.lastIndexOf(" ", endIx) + 1;
		if (this.agent.substr(begIx,3) == "rv:") begIx += 3;
		this.rev = this.agent.substring(begIx,endIx);

		if (this.agent.indexOf("Netscape") > -1) {
			this.mz = false;
			ix = this.agent.indexOf("Netscape");
			this.version = this.agent.substr(this.agent.indexOf("index.html",ix) + 1);
			ix = this.version.indexOf(" ");
			if (ix > 0) this.version = this.version.substr(0,ix);
			var verMajor = parseInt(this.version);
			this.ns60 = (this.version.substr(0,3) == "6.0");
			this.ns6x = (this.version.substr(0,2) == "6.");
			this.ns70 = (this.version.substr(0,3) == "7.0");
			this.ns7 = (verMajor >= 7);
			this.ns7x = (verMajor == 7);
			this.ns8 = (verMajor >= 8);
			this.ns8x = (verMajor == 8);
			this.ns9 = (verMajor >= 9);
		} else {
			this.mz = true;
			ix = this.agent.indexOf("Firefox");
			if (ix >= 0) {
				this.version = this.agent.substr(this.agent.indexOf("index.html",ix) + 1);
				ix = this.version.indexOf(" ");
				if (ix > 0) this.version = this.version.substr(0,ix);
			} else {
				this.version = "0";
			}
			this.ns60 = (this.rev.substr(0,3) == "0.6");
			this.ns6x = (this.rev.substr(0,2) == "0.");
			this.ns70 = (this.rev.substr(0,3) == "1.0" || this.rev.substr(0,3) == "1.1");
			this.ns7 = (parseInt(this.rev) >= 1);
		}
	}
	else this.ns60 = this.ns6x = this.ns70 = this.mz = false;
	this.ns4x = (document.layers && !this.dom);
	if (this.ns4x && !this.sf) {
		ix = this.agent.indexOf("Mozilla/index.html") + 8;
		this.rev = this.agent.substr(ix);
		ix = this.rev.indexOf(" ");
		if (ix > 0) this.rev = this.rev.substr(0,ix);
		this.version = this.rev;
	}
	this.ns = (this.ns4x || (this.ns6 & !this.mz));

	this.bw = (this.ie || this.ns || this.op5 || this.dom || this.sf || this.op8x || this.op9);
	return this;
}

