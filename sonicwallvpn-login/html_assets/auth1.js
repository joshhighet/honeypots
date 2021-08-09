var bw=new lib_bwcheck();
var timeoutId = null;


function sslvpnRedirect()
{
	var port = 443;
	var hostName = window.location.hostname.toString();
	if((hostName.charAt(0) != "[") && !(hostName.indexOf(":") < 0))
	{
		hostName = "[" + hostName + "]";
	}
	top.location.href="https://" + hostName + ":" + port + "/sslvpnLogin.html";
	if (timeoutId != null) {
		clearTimeout(timeoutId);
		timeoutId = null;
	}
}

var pbEnable = 0;


function setSessIdCookie() {
	setCookie("SessId", document.standardPass.sessId.value, null, null, null, true);
}

function setPostData(uName, pwd) {
	setSessIdCookie();

	var authForm = document.standardPass;
	top.savedPwd = pwd;
	setEncryptSeed(pwd, authForm.param2.value);
	if (authForm.param1.value != "") {
		authForm.digest.value = chapDigest(authForm.id.value, pwd,
						authForm.param1.value);
		authForm.pwd.value = "NR";
		authForm.pwd.value = "";
	}
	authForm.uName.value = uName;
	authForm.pass.value = pwd;
	setAuthConnId(authForm.connid);
	authForm.userName.disabled = true;
	authForm.pwd.disabled = true;
	authForm.Submit.disabled = true;
}

function processButn() {
	if (document.standardPass.pwd) {
		var pwd = document.standardPass.pwd.value;
		if (pwd != "") {
			setPostData(document.standardPass.userName.value, pwd);
			return true;
		}
		alert(strPasswordNeeded);
		document.standardPass.pwd.focus();
	}
	return false;
}
function setAuthConnId(elem) {
	var res = top.location.search.match(/[?&]cid=(\d+)/);
	if (res) {
		elem.disabled = false;
		elem.value = res[1];
	}
}
function areCookiesEnabled() {
	if (document.all) {
		if (!navigator.cookieEnabled) {
			alert(strEnableCookies);
			return false;
		}
	} else {
		setCookie('temp','temp');
		var temp = getCookie('temp');
		if (!temp) {
			alert(strEnableCookies);
			return false;
		}
	}
	return true;
}
function timedOut() {
	var pageUrl = "authTimeout.html";
	self.location.href = pageUrl;
	timeoutId = null;
}
function onPageLoad() {
	if (top.name == "loginStatus_18B169AE3318") {
		if (window.opener && !window.opener.closed) {
			window.opener.location = "auth.html";
		} else {
			window.open("auth.html", "swMgmnt_18B169AE3318",
				"width=800,height=500,resizable,status,location," +
				"menubar,toolbar,personalbar,directories,scrollbars");
		}
		top.opener = null;
		top.close();
	}
	else {
		setTimeout('timedOut()', 1 * 60000 - 1000);
		top.name = "swMgmnt_18B169AE3318";
		if (top != window && top.document) {
			top.document.title = window.document.title;
		}

		var setFoucs = true;
		setFoucs = pbEnable? false: true;

		if(setFoucs) {
			self.focus();

			document.standardPass.userName.focus();
		}

		areCookiesEnabled();
	}
}
function onNsKeyPress(ev) {
	if (ev.which == 13) {
		if (processButn()) document.standardPass.submit();
	}
}
if (bw.ns4x) {
	window.onkeypress = onNsKeyPress;
	window.captureEvents(Event.KEYPRESS);
} else if (bw.ns60) {
	document.onkeydown = onNsKeyPress;
}

$(document).ready(function(){
	onPageLoad();


	var x = "";
	if (msgObj) {
		try {
			if (/^\w+$/.test(msgObj.jsVar)) {
				x = eval(msgObj.jsVar);
				if (!x || x.length == 0) {
					x = msgObj.genMsg;
				}
			}
			else {
				x = msgObj.genMsg;
			}
		} catch (e) {
			x = msgObj.genMsg;
		}
	}

	$("#error_text").html(x);
	if (x != "") {
		$("#error_box").css("visibility", "visible");
	}
	else {
		$("#error_box").css("visibility", "hidden");
	}

	$("#sslvpn_enabled").css("visibility", "visible");



	var isAdminReauth = false;

	if (isAdminReauth) {
		$("input#userName").attr("disabled", "disabled");
		$("input#userName").val("");
		$("#admin_reauth_text").css("visibility", "visible");
	}
	else {
		$("input#userName").removeAttr("disabled");
		$("input#userName").val("");
		$("#admin_reauth_text").css("visibility", "hidden");
	}


});
