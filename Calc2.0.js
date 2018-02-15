function collectDataFromDOM(event) {
  var clickInput = event.target.value;
  checkUserInput(clickInput);
}

function checkUserInput(clickInput) {
  var DOMPresentation;
  if (clickInput >= 0 && clickInput <= 9) {
    checkOnlyTwoOpersINaROW = 0;
    DOMInput.push(clickInput);
    DOMPresentation = DOMInput.join("");
    document.querySelector("#result").innerHTML = DOMPresentation;
  } else if (clickInput == "delete") {
    DOMInput = [];
    document.querySelector("#result").innerHTML = "0";
  } else if (clickInput !== "=" && checkOnlyTwoOpersINaROW <= 2) {
    DOMInput.push(clickInput);
    DOMPresentation = DOMInput.join("");
    document.querySelector("#result").innerHTML = DOMPresentation;
    checkOnlyTwoOpersINaROW++;
  } else if (clickInput === "=") {
    DOMPresentation = DOMInput.join("");
    expression = DOMPresentation.split(/([\/\*\+\-])/);
    result = Calculate(checkNegatives(removeWhiteSpaces(expression)));
    if(isNaN(result)){
    document.querySelector("#result").innerHTML = "Invalid Input";
    }
    else{
        document.querySelector("#result").innerHTML = result;
    }
  }
}

function removeWhiteSpaces(splittedUserInput) {
  splittedUserInput.forEach(element => {
    if (element !== "") {
      splittedByOperatorsWithoutSpaces.push(element);
    }
  });
  return splittedByOperatorsWithoutSpaces;
}

function checkNegatives(noWhiteSpaces) {
  for (i = 0; i < noWhiteSpaces.length; i++) {
    if (i != 0 && noWhiteSpaces[i] !== "-") {
      var firstBuffer = noWhiteSpaces[i];
      var secondBuffer = noWhiteSpaces[i + 1];
      var nextNumber = noWhiteSpaces[i + 2];
      var negativeNumber;

      if (noWhiteSpaces[i] === "") {
        return;
      }
      if (
        isNaN(parseFloat(firstBuffer)) &&
        isNaN(secondBuffer) &&
        secondBuffer === "-"
      ) {
        operator = firstBuffer;
        fixedMathExpression.push(operator);
        negativeNumber = parseFloat(secondBuffer + nextNumber);
        noWhiteSpaces[i] = 0;
        noWhiteSpaces[i + 2] = negativeNumber;
        i++;
      } else if (parseFloat(noWhiteSpaces[i])) {
        parsedNumber = parseFloat(noWhiteSpaces[i]);
        fixedMathExpression.push(parseFloat(noWhiteSpaces[i]));
      } else {
        operator = noWhiteSpaces[i];
        fixedMathExpression.push(operator);
      }
    } else {
      var negativeNumber;
      var nextNumber = noWhiteSpaces[i + 1];
      var minusOperator = noWhiteSpaces[i];

      negativeNumber = parseFloat(minusOperator + nextNumber);
      noWhiteSpaces[i + 1] = negativeNumber;
      noWhiteSpaces[i] = 0;
    }
  }
  return fixedMathExpression;
}

function Calculate(fixedExpression) {
  for (i = 0; i <= fixedExpression.length - 2; i++) {
    switch (fixedExpression[i]) {
      case "+":
        result = fixedExpression[i - 1] + fixedExpression[i + 1];
        fixedExpression[i + 1] = result;
        break;

      case "/":
        result = fixedExpression[i - 1] / fixedExpression[i + 1];
        fixedExpression[i + 1] = result;
        break;

      case "*":
        result = fixedExpression[i - 1] * fixedExpression[i + 1];
        fixedExpression[i + 1] = result;
        break;

      default:
        continue;
    }
  }
  return result;
}

var fixedMathExpression = [],
  splittedByOperatorsWithoutSpaces = [],
  splittedByOperators = [],
  userInput = "";
var fixeExpression = 0,
  result = 0;
var firstRow = document.getElementById("first-rows");
var DOMInput = [];
var checkOnlyTwoOpersINaROW = 0;
var expression = [];
numbers.addEventListener("click", collectDataFromDOM);
firstRow.addEventListener("click", collectDataFromDOM);

splittedByOperators = userInput.split(/([\/\*\+\-])/);

fixeExpression = checkNegatives(removeWhiteSpaces(splittedByOperators));
result = Calculate(fixeExpression);
alert(result);
