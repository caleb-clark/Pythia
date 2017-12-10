var userText;
var app;


var operators = new Set(['+','-','/','(',')','*','&','|','&&','||','!','^']);


var operationMap = {
  'simplify':'simplify/expression', 
  'factor': 'factor/expression',
  'zeroes': 'zeroes/expression',
  'integrate': 'integrate/expression',
  'derive': 'derive/expression',
  'cos': 'cos/value',
  'sin': 'sin/value',
  'tan': 'tan/value',
  'arccos': 'arccos/value',
  'arcsin': 'arcsin/value',
  'arctan': 'arctan/value',
  'abs': 'abs/value',
  'log': 'log/base:value',
  'tangent':'tangent/at|expression',
  'area': 'area/from:to|expression'
};

var lexicon = {
	
	'addition': 'Addition',
	'add': 'Addition',
	'sum': 'Addition',
	'plus': 'Addition',
	
	'subtract': 'Subtraction',
	'difference': 'Subtraction',
	'minus': 'Subtraction',
	
	'multiplication': 'Multiplication',
	'multiply': 'Multiplication',
	'product': 'Multiplication',
	'times': 'Multiplication',
	
	'divide': 'Division',
	'quotient': 'Division',
	'division': 'Division',
	
	'solve': 'Zeroes',
	'zeroes': 'Zeroes',

	'graph': 'Plot',
	'plot': 'Plot',
	'visualize': 'Plot',

	'area': '2d_area',
	'area of': '2d_area',
	'area under': 'Area',
	//'area under': 'Operation',
	'area beneath': 'Area',
	'area underneath': 'Area',
		

	'perimeter': 'Perimeter',
	'distance around': 'Perimeter',

	'volume': 'Volume',
	'surface area': '3d_area',

	'sin': 'Sin',
	'sine': 'Sin',

	'cos': 'Cos',
	'cosine': 'Cos',

	'tan': 'Tan',
	'tangent': 'Tan',

	'limit': 'Limit',

	'derive': 'Derivative',
	'derivative': 'Derivative',
	'differentiate': 'Derivative',

	'integrate': 'Integrate',
	'integral' : 'Integrate',
};

var operations = {
'addition': 'Operation',

'add': 'Operation',

'sum': 'Operation',

'plus': 'Operation',

'subtract': 'Operation',

'difference': 'Operation',

'minus': 'Operation',

'multiplication': 'Operation',

'multiply': 'Operation',

'product': 'Operation',

'times': 'Operation',

'divide': 'Operation',

'quotient': 'Operation',

'division': 'Operation',

'solve': 'Operation',

'zeroes': 'Operation',

'graph': 'Operation',

'plot': 'Operation',

'visualize': 'Operation',

'area': 'Operation',

'area of': 'Operation',

'area under': 'Operation',

'area underneath': 'Operation',

'area beneath': 'Operation',

'perimeter': 'Operation',

'distance around': 'Operation',

'volume': 'Operation',

'surface area': 'Operation',

'sin': 'Operation',

'sine': 'Operation',

'cos': 'Operation',

'cosine': 'Operation',

'tan': 'Operation',

'tangent': 'Operation',

'limit': 'Operation',

'derive': 'Operation',

'derivative': 'Operation',

'integrate': 'Operation',

'integral': 'Operation'
};

function isAlpha(aChar)
{
  myCharCode = aChar.charCodeAt(0);

  if(((myCharCode > 64) && (myCharCode <  91)) ||
    ((myCharCode > 96) && (myCharCode < 123)))
  {
     return true;
  }

  return false;
}

function processText(userInput) {

	if (userInput.length == 0) {
		return -1;
	}

	var txt = nlp(userInput, lexicon);
	var numsBefore;// = txt.values().numbers();
	var numsAfter;
	var standardTxt =  nlp(userInput);
	var ops = nlp(userInput, operations);
	var expressions = [];
	var txtTerms = txt.terms().data();
	//console.log(txtTerms);
	var currExpression = "";
	for (var i = 0; i < txtTerms.length; i++) {
		var blah = false;
		for(var j = 0; j < txtTerms[i].text.length; j++) {
			console.log(txtTerms[i].text[j]);
			if (operators.has(txtTerms[i].text[j])) {
				blah = true;
			}
		}
		if (blah || txtTerms[i].bestTag == undefined || txtTerms[i].bestTag == 'Value' || operators.has(txtTerms[i].text)) {
			console.log('here');
			console.log(txtTerms[i][txtTerms[i].length-1]);
			if (txtTerms[i].bestTag == 'Value') {
				currExpression += txtTerms[i].normal;
				//console.log(txtTerms[i]);
				console.log('here112');
			} 
			else if (operators.has(txtTerms[i].text[txtTerms[i].text.length-1])) {
				console.log('here111');
				currExpression += txtTerms[i].text;
			}
			else {
				currExpression += txtTerms[i].normal;
				console.log('here114');
			}
		} else if (!(blah ||txtTerms[i].bestTag == undefined || txtTerms[i].bestTag == 'Value' || operators.has(txtTerms[i].text)) && currExpression.length > 0) {
			console.log(currExpression);
			expressions.push(currExpression);
			currExpression = "";
			console.log('here113');
		}
		console.log(txtTerms[i].text + '->' + txtTerms[i].bestTag);
	}

	if (currExpression.length > 0) {
		console.log(currExpression);
		expressions.push(currExpression);
	}
	console.log(expressions);
	currExpression = "";

	var variables = [];	

	for (var i = 0; i < expressions.length; i++) {
		currVars = new Set();
		for (var j = 0; j < expressions[i].length; j++) {
			if (isAlpha(expressions[i][j])) {
				currVars.add(expressions[i][j]);
			}
		}
		
			variables.push(currVars);
		
	}

	console.log(variables);
	var finalVar = "";
	if (variables.length > 0) {
		finalVar = variables[0].values().next().value;
	}


	if (variables[0].has("x")) {
		finalVar = "x";
	}


	var splitStr = ops.splitOn('#Operation');

	var beforeOp = "";
	var afterOp = "";
	if (splitStr.length > 2) {
		beforeOp = splitStr.get(0);
		numsBefore = beforeOp.values().numbers();
		afterOp = splitStr.get(splitStr.length - 1); 
		numsAfter = afterOp.values().numbers();
	}

	// GRAB THE OPERATION TYPE


	var ops_ = new Set();

	for (var key in lexicon) {

		if (txt.match('#' + key).found) {
			ops_.add(lexicon[key]);
			
		}
	}

	if (ops_.has('2d_area') && ops_.has('Area')) {
		ops_.delete('2d_area');
	}

	// Print out information about query parts before and
	// after the operation information

	if (beforeOp != "") {
		console.log('Before Op: ' + beforeOp.out());
		console.log(numsBefore);
	}

	console.log('Op: ' );
	console.log(ops_);
	
	if (afterOp != "") {
		console.log('After Op: ' + afterOp.out());
		console.log(numsAfter);
	}
	
	var finalOperation = "";
	var finalExpression = "";

	//console.log('Mathematical expressions:');
	//console.log(expressions[0]);
	//console.log(finalVar);
	//console.log(ops_.values().next().value.toLowerCase());
	if (expressions.length > 0) {
		finalExpression = expressions[0];
	}
	if (ops_.size > 0) {
		finalOperation = ops_.values().next().value.toLowerCase();
	}


	if (finalOperation == "" && finalExpression == "") {
		return -1;
	} else if (finalOperation != "" && finalExpression == "") {
		// some other query
	} else if (finalOperation == "" && finalExpression != "") {
		// just throw is nerdamer and see what happens
		if (finalVar == "") {
			return -1;
		}



	} else if (finalOperation != "" && finalExpression != "") {
		// good

		var nerdamerString;
		
		nerdamerString = opToExpr(finalOperation, finalExpression, finalVar);
		
		console.log(nerdamerString);

		var answer = nerdamer(nerdamerString);
		
		var myFunction = answer.buildFunction();

		var x_vals = [];
		
		var y_vals = [];
		
		for (var q = -10; q <= 10; q += 0.1) {
			x_vals.push(q);
			y_vals.push(myFunction(q));
		}


		// Convert things to latex
		var answerLatex =  nerdamer.convertToLaTeX(answer.toString());
		var questionLatex = nerdamer(expressions[0]);
		questionLatex = opToExpr(ops_.values().next().value.toLowerCase(), questionLatex, finalVar);
		questionLatex = nerdamer.convertToLaTeX(questionLatex);
		// log info to console
		console.log(questionLatex.toString());
		console.log(answer.toString());
		console.log(answerLatex.toString());
		// User feedback



		yourQSentence = 'You asked: ' + standardTxt.sentences().out();
		
		document.getElementById('you-asked').innerHTML = yourQSentence;
		
		var math = MathJax.Hub.getAllJax("math-expr")[0];
		
		MathJax.Hub.Queue(["Text",math,questionLatex.toString() + ' = ' + answerLatex.toString()]);

		getVisual(x_vals,y_vals);
		
		document.getElementById('answer-box').style.display = 'block';

	} else {
		return -1;
	}


}

function opToExpr(typeExpr,expr,finalVar) {
	if (typeExpr == 'derivative') {
		return 'diff(' + expr + ',' + finalVar + ')';
	} else if (typeExpr == 'integrate') {
		return 'integrate(' + expr + ',' + finalVar + ')';
	} 
}


function evaluate(expression) {
	// alert(expression['operation']);
	var operation = expression['operation'];
	var requestString = operationMap[operation];
	
	if (operation == 'simplify' ||
		operation == 'factor' ||
		operation == 'derive' ||
		operation == 'integrate' ||
		operation == 'zeroes' ) 
	{
		if ('expression' in expression) {
			requestString = requestString.replace('expression', expression['expression']);
		} else {
			return '0';
		}
	} else if (
		operation == 'cos' ||
		operation == 'sin' ||
		operation == 'tan' ||
		operation == 'arccos' ||
		operation == 'arcsin' ||
		operation == 'arctan' ||
		operation == 'abs' ||
		operation == 'log' 
		) 
	{
		if ('value' in expression) {
			requestString = requestString.replace('value', expression['value']);
		} else {
			// invalid
			return '0';
		}


	} else if (operation == 'area') {
		if ('from' in expression && 'to' in expression && 'expression' in expression) {
			requestString = requestString.replace('from', expression['from']);
			requestString = requestString.replace('to', expression['to']);
			requestString = requestString.replace('expression', expression['expression']);
	//		alert(requestString);
		} else {
			// invalid
			return '0';
		}

	} else if (operation == 'tangent') {
		if ('at' in expression &&  'expression' in expression) {
			requestString = requestString.replace('at', expression['at']);
			requestString = requestString.replace('expression', expression['expression']);
		} else {
			// invalid
			return '0';
		}
	} else {
		// invalid
		return '0';
	}
	
	//alert(requestString);
	
	newtonUrl = 'https://newton.now.sh/';
	newtonUrl += requestString;
	var api_response;
	
	$.ajax({
		'url':newtonUrl,
		'async': false,
		dataType: 'json',
		success: function (data) {
			api_response = data['result'];
			//alert(api_response);
		}
	});

	return api_response;

}

function getValues(power,x) {
	var y = [];
	for (var i = 0; i < x.length; i++) {
		y.push(Math.pow(x[i],power));
	}
	return y;
}

function getVisual(x_vals, y_vals) {
tester = document.getElementById('visual')



var trace1 = {
    x: x_vals,
    y: y_vals,
    type:'scatter',
    mode: 'lines',
   	shape: 'spline', 
	smoothing: 1.3,
	fill: 'tozeroy',
	line: {
		color: '#ffbe86'
	}

};

var data = [trace1];

var layout = {
    title: 'Visual Representation',
    showlegend: false,
  	font: {
    family: 'Roboto',
    size: 18,
    color: '#dfdfdf'
  },
  margin: {
    l: 50,
    r: 50,
    b: 100,
    t: 100,
    pad: 4
  },
  xaxis: {
  	color: '#dfdfdf',
  	tickcolor: '#dfdfdf'
  	
  },
  yaxis: {
  	tickcolor: '#dfdfdf',
  	color: '#dfdfdf'
  },
  paper_bgcolor: 'rgba(223, 223, 223, 0.25)',
  plot_bgcolor: 'rgba(223, 223, 223, 0.25)'
};
Plotly.newPlot(tester, data, layout, {staticPlot: true});
document.getElementById('visual').style.display = 'inline';


}

function mathExpression() {

}

function externalReadings() {

}

function preprocessStr(userInput) {
	
	userInput = userInput.toLowerCase();

	return userInput;
}

function userSubmit() {
	document.getElementById('answer-box').style.display = 'none';
	document.getElementById('visual').style.display = 'none';
	userText = $('#text-area').val();
	//alert(userText);
	userText = preprocessStr(userText);
	var returnVal = processText(userText);

	if (returnVal == -1) {
		var feedBack = document.getElementById('answer-box');
		feedBack.style.display = 'block';
		document.getElementById('you-asked').innerHTML = "Please enter a valid question.";
	}

	$('#text-area').val('');

	expr = {
		'operation': 'area',
		'expression': 'x^3',
		'value': '',
		'from' : '0',
		'to': '2',
		'at': '',
	};



	// nlp(userText);
	// alert(evaluate(expr));
	// var result = evaluate(expr);
	// alert(result)
	// alert(son.response);
	//getVisual();
}

function onload() {
	return;
}



