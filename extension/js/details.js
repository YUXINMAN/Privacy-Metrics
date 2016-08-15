
document.addEventListener('DOMContentLoaded', function () {
	var bg = chrome.extension.getBackgroundPage();
	$('#score-num').html(bg.score);
	
	setScoreDescription(bg.result);
	
	setInputTable(bg.result);
});


function setScoreDescription(result){
	var score_description = "";
	for (var i = 0; i < result.length; i++){
		score_description = score_description + "frame " + (i + 1) + " URL: " + result[i]['URL'] + "<br>";
	}
	$('#score-description').html(score_description);
}

function setInputTable(result){
	for (var i = 0; i < result.length; i++){
		var formInfos = result[i]['request'].formInfos;
		for (var key in formInfos){
			console.log(key);
			var tr = "<tr class=";
			if (key == 'Post_Forms'){
				tr = tr + "'success'>";
			}
			if (key == 'Get_Forms'){
				tr = tr + "'danger'>";
			}
			if (key == 'Total_Forms'){
				tr = tr + "'info'>";
			}
			tr = tr + "<td>frame" + (i + 1) + ":" + key + "</td><td>" + formInfos[key] + "</td></tr>";
			$('table#input-table').children('tbody').append(tr);
		}
	}
}