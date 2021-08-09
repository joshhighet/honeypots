
var ACTIVE_VIEW		 = 555;
var ACTIVE_TITLE	 = 666;
var ACTIVE_TAB 		 = 777;
var RESTORE_DEFAULTS = 888;
var RULE_VIEW		 = 999;
var NAT_RULE_VIEW	 = 1000;
var SERVICES_VIEW	 = 1001;
var AO_PAGE_VIEW	 = 1002;
var PBR_RULE_VIEW	 = 1003;
var CERTS_PAGE_VIEW	 = 1004;
var NX_AUTO_LAUNCHED = 1005;
var NETMON_POLICY_RULE_VIEW = 1006;
var HA_MONITOR_NDX	 = 7430;
var VPN_POLICY_TYPE	 = 7431;
var SCRL_TAB_COOKIE	 = 7433;

var RULE_IPVERSION_VIEW	= 7507;
var INTERFACES_VIEW	 = 7508;
var EDIT_IF6_RESUME_LAST_TAB  = 7509;
var VPN_IPVERSION_VIEW = 7510;
var DHCPS_VIEW		 = 7511;
var DNS_VIEW		 = 7512;
var HAMONITORING_VIEW	 = 7513;
var DDNS_VIEW		 = 7514;

var FLOODPROTECT_UDP_VIEW	 = 7516;
var FLOODPROTECT_ICMP_VIEW   = 7517;





function setCookie(key, value) {
  var argv = setCookie.arguments;
  var argc = setCookie.arguments.length;
  var expires = (argc > 2) ? argv[2] : null;
  var path = (argc > 3) ? argv[3] : null;
  var domain = (argc > 4) ? argv[4] : null;
  var secure = (argc > 5) ? argv[5] : false;
  document.cookie = key + "=" + escape (value) +
	((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
	((path == null) ? "" : ("; path=" + path)) +
	((domain == null) ? "" : ("; domain=" + domain)) +
	((secure == true) ? "; secure" : "");
}
function getCookie(key) {
	if (document.cookie.length) {
		var cookies = ' ' + document.cookie;
		var start = cookies.indexOf(' ' + key + '=');
		if (start == -1) {
			return null;
		}
		var end = cookies.indexOf(";", start);
		if (end == -1) {
			end = cookies.length;
		}
		end -= start;
		var cookie = cookies.substr(start,end);
		return unescape(cookie.substr(cookie.indexOf('=') + 1, cookie.length - cookie.indexOf('=') + 1));
	} else {
		return null;
	}
}
function cookieExists(key) {
	if (document.cookie.length) {
		var cookies = ' ' + document.cookie;
		var start = cookies.indexOf(' ' + key + '=');
		if (start == -1) {
			return false;
		}
	} else {
		return false;
	}

	return true;
}
function verifySessCookie(thisSess) {
	if (thisSess != 0) {
		var sessId = getCookie("SessId");
		if (thisSess != sessId) {
			var gmsLogin = getCookie("gmsLogin");
			if(!gmsLogin || gmsLogin=="") {
				alert("This browser window does not appear to be the one most recently used to"
					+ " log in to the SonicWall.\n"
					+ " You will need to switch to that browser window or re-log in");
				top.location.href = "auth.html";
			} else {
				setCookie("SessId",thisSess);
				setCookie("gmsLogin","");
			}
		}
	}
}
function deleteCookie(name) {
	if (getCookie(name)) {
		document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}
