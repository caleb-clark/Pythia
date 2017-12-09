var userText;
var app;
var operationMap = {
  "simplify":"simplify/expression", 
  "factor": "factor/expression",
  "zeroes": "zeroes/expression",
  "integrate": "integrate/expression",
  "derive": "derive/expression",
  "cos": "cos/value",
  "sin": "sin/value",
  "tan": "tan/value",
  "arccos": "arccos/value",
  "arcsin": "arcsin/value",
  "arctan": "arctan/value",
  "abs": "abs/value",
  "log": "log/base:value",
  "tangent":"tangent/at|expression",
  "area": "area/from:to|expression"
};

function nlp(userInput) {
	//var api_response;
	

	$.ajax({
		method: "POST",
		type: "POST",
		withCredentials: true,
		url: "https://api.textrazor.com/",
		dataType: 'json',
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Access-Control-Allow-Credentials","true");
			xhr.setRequestHeader("Access-Control-Expose-Headers", "x-textrazor-key");
			xhr.setRequestHeader("Access-Control-Allow-Origin","*");
			xhr.setRequestHeader("x-textrazor-key","40831997fc30a0215d6072917c65a54eb0ee04cb34ff060711379a00");

		},
		data: { 
			extractors: "entities,topics,relations",
			text:userInput
		},
		crossDomain: true,
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


function evaluate(expression) {
//	alert(expression["operation"]);
	var operation = expression["operation"];
	var requestString = operationMap[operation];
	if (operation == "simplify" ||
		operation == "factor" ||
		operation == "derive" ||
		operation == "integrate" ||
		operation == "zeroes" ) 
	{
		if ("expression" in expression) {
			requestString = requestString.replace("expression", expression["expression"]);
		} else {
			return "0";
		}
	} else if (
		operation == "cos" ||
		operation == "sin" ||
		operation === "tan" ||
		operation == "arccos" ||
		operation == "arcsin" ||
		operation === "arctan" ||
		operation == "abs" ||
		operation == "log" 
		) 
	{
		if ("value" in expression) {
			requestString = requestString.replace("value", expression["value"]);
		} else {
			// invalid
			return "0";
		}


	} else if (operation == "area") {
		if ("from" in expression && "to" in expression && "expression" in expression) {
			requestString = requestString.replace("from", expression["from"]);
			requestString = requestString.replace("to", expression["to"]);
			requestString = requestString.replace("expression", expression["expression"]);
	//		alert(requestString);
		} else {
			// invalid
			return "0";
		}

	} else if (operation == "tangent") {
		if ("at" in expression &&  "expression" in expression) {
			requestString = requestString.replace("at", expression["at"]);
			requestString = requestString.replace("expression", expression["expression"]);
		} else {
			// invalid
			return "0";
		}
	} else {
		// invalid
		return "0";
	}
	//alert(requestString);
	newtonUrl = "https://newton.now.sh/";
	newtonUrl += requestString;
	var api_response;
	$.ajax({
		'url':newtonUrl,
		'async': false,
		dataType: 'json',
		success: function (data) {
			api_response = data["result"];
			//alert(api_response);
		}
	});

	return api_response;
}

function getVisual() {

}

function mathExpression() {

}

function externalReadings() {

}

function userSubmit() {

	userText = $('#text-area').val();
	
	$('#text-area').val("");

	expr = {
		"operation": "area",
		"expression": "x^3",
		"value": "",
		"from" : "0",
		"to": "2",
		"at": "",
	};


//	nlp(userText);
	//alert(evaluate(expr));
	var result = evaluate(expr);
	alert(result)
	//alert(son.response);



}

function onload() {
	return;
}



