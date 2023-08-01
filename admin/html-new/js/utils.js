function nvl(value, defualt) {
	if(typeof value == 'undefined' || value == null || String(value) == 'null') {
		return defualt;
	}
	else {
		return value;
	}
}

function arrayPrepend(resultArr, array) {
	for(var i = array.length-1; i>=0; i--){
		resultArr.unshift(array[i]);
	}
	
	return resultArr;
}

function replaceQuot(str){
	str = str.replace(/"/g, '\\"');
	str = str.replace(/'/g, "\\'");
	
	return str;
}

String.prototype.trim = function() { 
	return this.replace(/^\s+|\s+$/g,""); 
}

function isNumeric(value) {
	var result = false;

	try {
		parseFloat(value);
		result = true;
	} catch(e) {
		result = false;
	}

	return result;
}