var score = 0;
var result = [];//list of dictionary with two elements: URL and request(object)
var newTab = false;//indicate if I should clear the variables

function rate(){
	var numPost = 0;
	var numTotal = 0;
	for (var i = 0; i < result.length; i++){
		numPost += result[i]['request'].formInfos.Post_Forms;
		numTotal += result[i]['request'].formInfos.Total_Forms;
	}
	return parseInt(numPost * 100 / numTotal);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	//alert("newTab message " + newTab);
	if (newTab){
		score = 0;
		result = [];
		newTab = false;
	}
	result.push(request);
	score = rate();
	chrome.browserAction.setBadgeText({text:score.toString()});
    // if (request.greeting == "hello")
      // sendResponse({farewell: "goodbye"});
});

chrome.tabs.onUpdated.addListener(function(tab) {
	
  //alert("newTab update " + newTab);
  newTab = true;
  var scripts = [
    'libs/jquery.js',
    'js/mycontent.js'
  ];
  scripts.forEach(function(script) {
    chrome.tabs.executeScript(null, {file: script, allFrames: true});
	//console.log(script);
  });

});

chrome.tabs.onActivated.addListener(function(tab) {
  //alert("newTab activate " + newTab);
  newTab = true;
  var scripts = [
    'libs/jquery.js',
    'js/mycontent.js'
  ];
  scripts.forEach(function(script) {
    chrome.tabs.executeScript(null, { file: script, allFrames: true});
	//console.log(script);
  });

});

chrome.browserAction.onClicked.addListener(function(){
	chrome.tabs.create({url:"../page/details.html"});
});
