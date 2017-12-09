var userText;
var app;


function apiTest() {
	//var api_response;
	$.ajax({
		method: "POST",
		type: "POST",
		withCredentials: true,
		url: "https://api.textrazor.com/",
		dataType: 'json',
		beforeSend: function(xhr) {
			xhr.setRequestHeader("x-textrazor-key","40831997fc30a0215d6072917c65a54eb0ee04cb34ff060711379a00");
		},
		data: { 
			extractors: "entities,entailments",
			text:"Spain's stricken Bankia expects to sell..." 
		},
		
		success:function(data) {
			alert(JSON.stringify(data));
		},error: function(xhr) {
			alert("<some error>");
			console.error(xhr.responseText);
		}
	});
	/*
	$.ajax({
		'url':"https://api.textrazor.com",
		'x-textrazor-key': "40831997fc30a0215d6072917c65a54eb0ee04cb34ff060711379a00",
		'type': "POST",
		data: {
		'extractors': "entities, topics,entailments, relations",
		'text': "What is the area under the curve x to the third power from 0 to 3?",
		'async': false,
		success: function (data) {
			api_response = data;
		}
	});*/

	//return api_response;
}

function userSubmit() {

	userText = $('#text-area').val();
	
	$('#text-area').val("");


	apiTest();

	//alert(son.response);



}

function onload() {
	return;
}



