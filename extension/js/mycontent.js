function privacyInfo(iframes, formInfos){
	this.iframes = iframes;
	this.formInfos = formInfos;
}

//deal with different browser regarding the message sending
if (!chrome.runtime) {
    // Chrome 20-21
    chrome.runtime = chrome.extension;
} else if(!chrome.runtime.onMessage) {
    // Chrome 22-25
    chrome.runtime.onMessage = chrome.extension.onMessage;
    chrome.runtime.sendMessage = chrome.extension.sendMessage;
    chrome.runtime.onConnect = chrome.extension.onConnect;
    chrome.runtime.connect = chrome.extension.connect;
}

//deal with forms
var formInfos = {"Total_Forms":0, "Get_Forms":0, "Post_Forms":0};
var forms = $('form');
var len = forms.length;
formInfos["Total_Forms"] = len;
for (var i = 0; i < len; i++){
  if (forms[i].method.toLowerCase() == 'get'){
    formInfos["Get_Forms"]++;
  }
  if (forms[i].method.toLowerCase() == 'post'){
    formInfos["Post_Forms"]++;
  }
}

//deal with iframes
var iframesURL = [];
var iframes = $('iframe');
for (var i = 0; i < iframes.length; i++){
  iframesURL.push(iframes[i].src);
}

var result = {URL: document.location.href, request: new privacyInfo(iframesURL, formInfos)};

//alert(len + " " + countGet);
chrome.runtime.sendMessage(result);