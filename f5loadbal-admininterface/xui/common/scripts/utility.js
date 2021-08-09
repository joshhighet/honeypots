// -----------------------------------------------------------------------------
// Frames and Windows
// -----------------------------------------------------------------------------

function resizeFrameHeight(frameNameOrID,fallbackHeightValue) {
	// Accessible Content
        // TODO -FOR_DEBUG
        // alert('in resizeFrameHeight: ' + frameNameOrID);
	try {
		// ID
		try {
			var newHeight = document.getElementById(frameNameOrID).contentWindow.document.body.scrollHeight;
			if (newHeight != 0)	document.getElementById(frameNameOrID).style.height = newHeight + 'px';
		}
		// Name
		catch(e) {
			var newHeight = frames[frameNameOrID].window.document.body.scrollHeight;
			if (newHeight != 0)	document.getElementsByTagName('iframe')[frameNameOrID].style.height = newHeight + 'px';
		}
	}
	// Non accessible content (different domain)
	catch(e) {
		if (fallbackHeightValue) {
			// ID
			try {
				if (newHeight != 0)	document.getElementById(frameNameOrID).style.height = fallbackHeightValue + 'px';
			}
			// Name
			catch(e) {
				if (newHeight != 0)	document.getElementsByTagName('iframe')[frameNameOrID].style.height = fallbackHeightValue + 'px';
			}
		}
	}
}

function forceFrameSource(frameName,frameID) {
	try {
		frames[frameName].location.replace(document.getElementById(frameID).src);
	}
	catch(e) {}
}

function openWindow(url,target,features) {
	var target = target ? target + removeNonAlphaNumeric(window.location.hostname) : '_blank';
	var features = features ? features : '';
	var theWindow =	window.open(url, target, features);
	if (theWindow) {
		theWindow.focus();
		return theWindow;
	}
	return false;
}

// Print, expand all and revert to previous state
function printFrame(frameName) {
    var styles = [];
    var helpFrameDD = $("iframe#helpframe").contents().find("dd");

    window.frames[frameName].focus();

    // save current style
    helpFrameDD.each(function(index) {
        styles.push($(this).css("display"));
    });

    // set all to visible
    helpFrameDD.css("display", "block");

    window.frames[frameName].print();

    // reset back
    helpFrameDD.each(function(index) {
        $(this).css("display", styles[index]);
    });
}

// -----------------------------------------------------------------------------
// Cookies
// -----------------------------------------------------------------------------

// Note - this function is duplicated in TMUI's base.js file. TMUI and XUI aren't officially
// supposed to know about each other, so this code is duplicated (for better or worse).
function getCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) {
			var cookieValue = c.substring(nameEQ.length,c.length);
			// Strip off leading and trailing quotes if they exist (cookie value had special characters)
			if (cookieValue && cookieValue.charAt(0) == '"' && cookieValue.charAt(cookieValue.length - 1) == '"') {
				cookieValue = cookieValue.substring(1, cookieValue.length - 1);
			}
			return cookieValue;
		}
	}
	return null;
}

// Note - this function is duplicated in TMUI's base.js file. TMUI and XUI aren't officially
// supposed to know about each other, so this code is duplicated (for better or worse).
function setCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = '; expires=' + date.toGMTString();
	}
	else expires = '';

	var prepared_value = '';
	if (value) {
		prepared_value = '' + value; // Ensure that we have a string value to work with
		prepared_value = '"' + prepared_value.replace(/(["\\])/g,'\\$1') + '"';
	}
	document.cookie = name + '=' + prepared_value + expires + '; path=/; SECURE;';
}

function delCookie(name) {
	setCookie(name,'',-1);
}

function delSession (key) {
	if (window && window.sessionStorage) {
		window.sessionStorage.removeItem(key);
	}
}

function getUrlValue(valueName) {
	// Returns value of name/value pair found after "?" in a URL
	// Example URL: http://www.somedomain.com/test.htm?myvalue=1
	// Example Usage: getUrlValue('myvalue') would return '1'
	var urlEnd = document.URL.indexOf('?');
	if (urlEnd != -1) {
		var urlValuePairList = document.URL.substring(urlEnd+1, document.URL.length).split('&');
		for (var i = 0; i < urlValuePairList.length; i++) {
			urlValuePair = urlValuePairList[i].split('=');
			if (urlValuePair[0] == valueName) {
				return urlValuePair[1];
			}
		}
	}
}

function removeNonAlpha(string) {
	return (string == undefined)? "" : string.replace(/[^a-zA-z]/ig,'');
}

function removeNonNumeric(string) {
	return (string == undefined)? "" : string.replace(/[^0-9]/ig,'');
}

function removeNonAlphaNumeric(string) {
	return (string == undefined)? "" : string.replace(/[^0-9A-Za-z]/ig,'');
}

function removeWhiteSpace(string) {
	return (string == undefined)? "" : string.replace(/\s/ig,'');
}

// -----------------------------------------------------------------------------
// Timers
// -----------------------------------------------------------------------------

var timerObj = 0;
var timerStart  = null;

function startTimer(targetID) {
	if (timerObj) {
		clearTimeout(timerObj);
		timerObj  = 0;
	}
	if (!timerStart) {
		timerStart = new Date();
		// timerStart = new Date("Dec 1, 2008 01:00:00");
	}
	var tDate = new Date();
	var targetObj = document.getElementById(targetID);
	targetObj.innerHTML = '';
	// Days
	var day_ms = 1000 * 60 * 60 * 24;
	var diff_ms = Math.abs(tDate.getTime() - timerStart.getTime());
	var tDays = Math.floor(diff_ms / day_ms);
	if (tDays > 0) {
		var label = tDays == 1 ? ' day, ' : ' days, ';
		targetObj.innerHTML += tDays + label;
	}
	// Time
	tDate.setTime(tDate.getTime() - timerStart.getTime());
	// Hours
	var tHours = tDate.getUTCHours();
	if (tHours > 0 || tDays > 0) {
		var label = tHours == 1 ? ' hour, ' : ' hours, ';
		targetObj.innerHTML += tHours + label;
	}
	// Minutes
	var tMinutes = tDate.getUTCMinutes();
	if (tMinutes > 0 || tHours > 0) {
		var label = tMinutes == 1 ? ' minute, ' : ' minutes, ';
		targetObj.innerHTML += tMinutes + label;
	}
	// Seconds
	var tSeconds = tDate.getUTCSeconds();
	var label = tSeconds == 1 ? ' second' : ' seconds';
	targetObj.innerHTML += tSeconds + label;
	// Repeat timer update
	timerObj = setTimeout('startTimer("' + targetID + '")', 1000);
}

function stopTimer() {
	if (timerObj) {
		clearTimeout(timerObj);
		timerObj  = 0;
	}
	timerStart = null;
}

// -----------------------------------------------------------------------------
// Misc.
// -----------------------------------------------------------------------------

function addBookmark(url,title) {
	if (url == undefined) {
		var url = window.location.href;
	}
	if (title == undefined) {
		var title = document.title;
	}
	// Mozilla Firefox Bookmark
	if (window.sidebar) {
		window.sidebar.addPanel(title, url,"");
	}
	// IE Favorite
	else {
		window.external.AddFavorite(url,title);
	}
}

function scrollToTop() {
	var x1 = x2 = x3 = 0;
	var y1 = y2 = y3 = 0;
	if (document.documentElement) {
		x1 = document.documentElement.scrollLeft || 0;
		y1 = document.documentElement.scrollTop || 0;
	}
	if (document.body) {
		x2 = document.body.scrollLeft || 0;
		y2 = document.body.scrollTop || 0;
	}
	x3 = window.scrollX || 0;
	y3 = window.scrollY || 0;
	var x = Math.max(x1, Math.max(x2, x3));
	var y = Math.max(y1, Math.max(y2, y3));
	window.scrollTo(Math.floor(x / 2), Math.floor(y / 2));
	if (x > 0 || y > 0) {
		window.setTimeout("scrollToTop()", 35);
	}
}
