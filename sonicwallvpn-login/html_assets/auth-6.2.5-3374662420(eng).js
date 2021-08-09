//////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2001 SonicWall, Inc
//
//////////////////////////////////////////////////////////////////////////////////////////////////



function xor(dataArray, patternArray) {
	var strResult = new String();
	if (dataArray.length != patternArray.length) {
		return strResult;
	}
	for (var i = 0; i < dataArray.length; i++) {
		var dat = parseInt(dataArray[i]);
		var pat = parseInt(patternArray[i]);
		var xorVal = (dat ^ pat);
		strResult += escape(String.fromCharCode(xorVal));
	}
	return strResult;
}
function setEncryptSeed(strPassPhrase, randomNumber) {
	var strInternalPageSeedHash = new String();
	if (strPassPhrase.length > 0) {
		strInternalPageSeedHash = calcMD5_2(getChars(randomNumber + strPassPhrase));
		setCookie("PageSeed", strInternalPageSeedHash, null, null, null, true);
	}
}
function verifyPassword(strPassPhrase, randonNumber1, randomNumber2) {
	var strInternalPageHash = new String();
	if (strPassPhrase.length > 0) {
		strInternalPageHash = calcMD5(randonNumber1 + strPassPhrase);
		setEncryptSeed(strPassPhrase, randomNumber2);
	}
	return strInternalPageHash;
}

function encryptUserPassword(strPassword, randomNumber) {
	var strPageSeedHash = new String(getCookie("PageSeed"));
	if (strPageSeedHash == null) return("Error");
	return changePassword(strPageSeedHash, randomNumber, strPassword, strPassword);
}

function changePassword(strEncSeed, randomNumber, strNewPassword, strConfirmPassword) {
	var strNewPasswordXOR = new String();
	var newPasswordArray = new Array();
	var oldPasswordHashArray = new Array();
	for (var i=0; i<33; i++) {
		newPasswordArray[i] = 0;
		oldPasswordHashArray[i] = 0;
	}

	var uriNewPasswd = getChars(strNewPassword);
	var uriEncSeed = getChars(strEncSeed);
	for (var j = i = 0; i < 33; i++, j++) {
		if (j >= uriEncSeed.length) j = 0;
		var v1 = (i < uriNewPasswd.length) ? uriNewPasswd[i] : 0;
		var v2 = 256 - uriEncSeed[j];
		newPasswordArray[i] = v1 ^ v2;
	}

	var strOldPassHash = new String(calcMD5_2(getChars(randomNumber).concat(uriEncSeed)));
	for (i=0; i<strOldPassHash.length; i++) {
		oldPasswordHashArray[i] = strOldPassHash.charCodeAt(i);
	}
	strNewPasswordXOR = xor(oldPasswordHashArray, newPasswordArray);
	return strNewPasswordXOR;
}

function extractRandNum(randNumHash, pageSeed) {
	var strSessId = new String(getCookie("SessId"));
	if (strSessId == null) return;
	var strSessIdSeedHash = new String(calcMD5_2(getChars(strSessId).concat(getChars(pageSeed))));
	var sessIdSeedHashArray = new Array();
	var randNumHashArray = new Array();
	for (var i = 0; i < 32; i++) {
		sessIdSeedHashArray[i] = strSessIdSeedHash.charCodeAt(i);
		randNumHashArray[i] = parseInt(randNumHash.substr(i*2, 2), 16);
	}
	var rNum = xor(sessIdSeedHashArray, randNumHashArray);
	return rNum;
}

function chapDigest(strId, strPass, strChal) {
	var id = getBytes(strId);

	var pass = new Array();
	pass = getChars(strPass);

	var chal = new Array();
	chal = getBytes(strChal);

	var inBuff = new Array();
	inBuff = id.concat(pass, chal);

	var strDigest = new String(calcMD5_2(inBuff));
	return strDigest;
}

function getBytes(str)
{
	var buf = new Array();
	var j = 0;

	for (var i = 0; i < str.length; i += 2)
	{
		buf[j++] = parseInt(str.substr(i,2), 16);
	}
	return buf;
}

function getChars(str)
{
	var buf = new Array();
	var uriStr = encodeURI(str);
	var count = 0;

	for (var i = 0; i < uriStr.length; i++,count++)
	{
		if(uriStr.charAt(i)=='%')
		{
			buf[count]=parseInt(uriStr.substr(i+1,2),16);
			i+=2;
		}
		else
		{
			buf[count] = uriStr.charCodeAt(i);
		}
	}
	return buf;
}

function showUlaAup(width, height, scroll) {
	var strScroll = (scroll) ? "" : " SCROLLING=NO";
	var x = (screen.availWidth/2)-230;
	var y = (screen.availHeight/2)-150;
	var msgWin = window.open("","displayWindow","screenX=200,screenY=200,width="+width+",height="+height);
	if (msgWin) {
		msgWin.moveTo(x,y);
		msgWin.document.open("text/html");
		msgWin.document.write('<HTML><HEAD><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><TITLE>Acceptable Use Policy</TITLE>\n');
		msgWin.document.write('</HEAD>\n');
		msgWin.document.write('<FRAMESET ROWS="*,50">\n');
		msgWin.document.write('<FRAME NAME="frm1" SRC="ulaAup.html"' + strScroll + '>\n');
		msgWin.document.write('<FRAME NAME="frm2" SRC="ulaAup.html" SCROLLING=NO>\n');
		msgWin.document.write('</FRAMESET></HTML>\n');
		msgWin.focus();
	} else {
		alert("Failed to open the SonicWall Acceptable Usage Policy window.\n\n"
			+ "To get access you will need to ensure that pop-ups are not blocked for '"
			+ location.hostname + "'");
	}

	return msgWin;
}

function showUlaAup2(width, height, scroll) {
	var strScroll = (scroll) ? "" : " SCROLLING=NO";

	var html = '<HTML><HEAD><TITLE>Acceptable Use Policy</TITLE>\n';
	html += '</HEAD>\n';
	html += '<FRAMESET ROWS="*,50">\n';
	html += '<FRAME NAME="frm1" SRC="ulaAup.html"' + strScroll + '>\n';
	html += '<FRAME NAME="frm2" SRC="ulaAup.html" SCROLLING=NO>\n';
	html += '</FRAMESET></HTML>\n';

	$("form[name='pForm']").remove();
	previewWindow(document, "pForm", "displayWindow", html, width, height);
}

