function getHistory(){
	return document.getElementById("history-value").innerText;
}

function printHistory(num){
	document.getElementById("history-value").innerText = num;
}

function getOutput(){
	return document.getElementById("output-value").innerText;
}

function printOutput(num){
	if(num == ""){
		document.getElementById("output-value").innerText = num;
	}
	else{
		document.getElementById("output-value").innerText = 
		getFormattedNumber(num);
	}	
}

function getFormattedNumber(num){
	if(num == "-"){
		return "";
	}
	// Converting raw value to comma seperated value
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}

function reverseNumberFormat(num){
	// Function to convert back to raw value for calcuations
	return Number(num.replace(/,/g,''));
}

var operator = document.getElementsByClassName("operator");
for(var i = 0; i < operator.length; i++){
	operator[i].addEventListener('click', function() {
		if(this.id == "clear"){
			// If clear button is pressed reset history and output
			printHistory("");
			printOutput("");
		}
		else if(this.id == "backspace"){
			// If backspace is pressed
			// convert output to raw value and remove last character
			var output = reverseNumberFormat(getOutput()).toString();
			if(output){ // If output has a value
				output = output.substr(0, output.length-1);
				printOutput(output);
			}
		}
		else{
			var output = getOutput();
			var history = getHistory();
			if(output == "" && history != ""){
				if(isNaN(history[history.length-1])){
					history = history.substr(0, history.length-1);
				}
			}
			if(output != "" || history != ""){
				output = reverseNumberFormat(output);
				history = history + output;
				if(this.id == "="){
					var result = eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history = history + this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}

var number = document.getElementsByClassName("number");
for(var i = 0; i < number.length; i++){
	number[i].addEventListener('click', function(){
		var output = reverseNumberFormat(getOutput());
		if(output != NaN){ // If output is a number
			output = output + this.id;
			printOutput(output);
		}
	});
}