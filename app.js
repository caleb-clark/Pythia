var userText;
var app;


function apiTest() {
	var api_response;
	$.ajax({
		'url':"https://api.textrazor.com",
		'x-textrazor-key': "40831997fc30a0215d6072917c65a54eb0ee04cb34ff060711379a00",
		'type': "POST",
		'extractors': "entities, topics,entailments, relations",
		'text': "What is the area under the curve x to the third power from 0 to 3?",
		'async': false,
		success: function (data) {
			api_response = data;
		}
	});
	return api_response;
}

function userSubmit() {

	userText = $('#text-area').val();
	
	$('#text-area').val("");


	son = apiTest();

	alert(son.response);



}

function onload() {
	return;
}



