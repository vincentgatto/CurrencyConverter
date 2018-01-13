var initMoneyType = "CAD";
var convMoneyType = "CAD";
var myObj;
var url = "https://api.fixer.io/latest";

function HttpGet(initCurrency,convertCurrency)
{
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        	
            myObj = JSON.parse(this.responseText);
            
            //TODO: update the conversion table with other currencies
            //TODO: write an alert for non-numerical input
            if(initMoneyType == convMoneyType){
            	document.getElementById("converted").value = document.getElementById("initial").value;
            }
            else if(initMoneyType == "CAD" && convMoneyType == "USD"){
            	document.getElementById("converted").value = document.getElementById("initial").value / parseFloat(myObj.rates.CAD) * parseFloat(myObj.rates.USD);
            }
            else if(initMoneyType == "CAD" && convMoneyType == "EUR"){
            	document.getElementById("converted").value = document.getElementById("initial").value / parseFloat(myObj.rates.CAD);
            }
            else if(initMoneyType == "USD" && convMoneyType == "CAD"){
            	document.getElementById("converted").value = document.getElementById("initial").value / parseFloat(myObj.rates.USD) * parseFloat(myObj.rates.CAD);
            }
            else if(initMoneyType == "USD" && convMoneyType == "EUR"){
            	document.getElementById("converted").value = document.getElementById("initial").value / parseFloat(myObj.rates.USD);
            }
            else if(initMoneyType == "EUR" && convMoneyType == "CAD"){
            	document.getElementById("converted").value = document.getElementById("initial").value * parseFloat(myObj.rates.CAD);
            }
            else if(initMoneyType == "EUR" && convMoneyType == "USD"){
            	document.getElementById("converted").value = document.getElementById("initial").value * parseFloat(myObj.rates.USD);
            }
        }
    };
    http.open( "GET", url, false ); //send a synchronous request
    http.send( null );
}

function setInit(currency){
	initMoneyType = currency;
	HttpGet(initMoneyType,convMoneyType);
}

function setConv(currency){
	convMoneyType = currency;
	HttpGet(initMoneyType,convMoneyType);
}

function displayDisclaimer(){
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
        }
    }
    http.open( "GET", url, false ); //send a synchronous request
    http.send( null );
    var strCAD = myObj.rates.CAD;
    var strUSD = myObj.rates.USD;
    var strDate = myObj.date;
	var str = "Conversion Rates=> \nEUR to CAD: " + strCAD + "\nEUR to USD: " + strUSD 
			+ "\nDate: " + strDate;
	alert(str);
}