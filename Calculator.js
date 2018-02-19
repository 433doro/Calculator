var fixedMathExpression = [],
  noWhiteSpaces = [],
  splittedUserInput = [],
  splittedByOperatorsWithoutSpaces = [],
  splittedByOperators = [],
  DOMInput = [],
  expression = [];

var fixedExpression = 0,
  result = 0,
  checkOnlyTwoOpersINaROW = 0;

var firstRow = document.getElementById("first-rows");
var numbers = document.getElementById("numbers");

/** 
*Collects the value of an DOM object which triggered a 'click'
* @param {event} event the click event 
*Calls the CheckUserInput and supplaies the value of the DOM Object as a param
 */
function collectDataFromDOM(event) {
  var clickInput = event.target.value;
  checkUserInput(clickInput);
}

/**
 * Makes sure that the result screen won't get overloaded
 * @param {Number} DOMInputLength represents the length of the DOM input array
 * @param {Array} Input the array of clickEvent values 
 */
function dislplayCheck(DOMInputLength,Input)
 {
  var DOMprePresent = [12]
   if (DOMInputLength>12)
   { 
     for (var i = DOMInputLength [Input.length-12]; i < DOMInputLength.length; i++)
     {
        DOMprePresent.push(Input[i])
        document.querySelector("#result").innerHTML = DOMprePresent.join("");
     }
   
    }
    else 
    {
      document.querySelector("#result").innerHTML = Input.join("");
    }
}

/**
 * Resets all the old calculations containers
 */
function resetOldCalculationsData(){
  splittedByOperators = [];
  expression = [];
  splittedByOperatorsWithoutSpaces= [];
  fixedMathExpression = [];
  result = 0 ;
}
/**
 * Performs validation on the user input (the click event values)
 * @param {string} clickInput the value of the current click event
 */
function checkUserInput(clickInput) {
  var DOMInputSize = DOMInput.length
  var DOMPresentation;
  if (clickInput >= 0 && clickInput <= 9) {
    checkOnlyTwoOpersINaROW = 0;
    DOMInput.push(clickInput);
    dislplayCheck(DOMInputSize,DOMInput);
  } 
  else if (clickInput == "delete") {
    DOMInput = [];
    resetOldCalculationsData();
    document.querySelector("#result").innerHTML = "0";
  }
   else if (clickInput !== "=" && checkOnlyTwoOpersINaROW < 2) {
    DOMInput.push(clickInput);
    DOMPresentation = DOMInput.join("");
    dislplayCheck(DOMInput.length,DOMInput);
    checkOnlyTwoOpersINaROW++;

  } else if (clickInput === "=") {
    DOMPresentation = DOMInput.join("");
    expression = DOMPresentation.split(/([\/\*\+\-])/);
    var whiteSpacesExcluded = removeWhiteSpaces(expression);
    result = Calculate(checkNegatives(whiteSpacesExcluded));
    if (isNaN(result)) {
      document.querySelector("#result").innerHTML = invalidMessage ;
    } else {
      document.querySelector("#result").innerHTML = result;
      resetOldCalculationsData();
  }
  }
}

/**
 * Gets an arrays as a parameter from the input, the array is made of an splitted string and therefore it might contain empty cells
 * Example  --- string before split"-32*65/7+2" 
 * @param {Array} splittedUserInput - recives an array of string from the input 
 */

function removeWhiteSpaces(splittedUserInput) {
  splittedUserInput.forEach(element => {
    if (element !== "") {
      splittedByOperatorsWithoutSpaces.push(element);
    }
  });
  return splittedByOperatorsWithoutSpaces;
}

/**
 * Recives as a @param {Array} noWhiteSpaces as the input string without the white-space cells and makes 
 * sure that all the minus operators who come after another operator will be linked to the number after them
 * 
 * the functions creats a new array and converts all the numbers string to actuall numbers
 * then pushes all the parsed numbers and operators inside, in the same order as the array of strings was before    
 */
function checkNegatives(noWhiteSpaces) {
  for (i = 0; i < noWhiteSpaces.length; i++) {
    if (i === 0 && noWhiteSpaces[i] === "-") {
      var negativeNumber;
      var nextNumber = noWhiteSpaces[i + 1];
      var minusOperator = noWhiteSpaces[i];

      negativeNumber = parseFloat(minusOperator + nextNumber);
      noWhiteSpaces[i + 1] = negativeNumber;
      noWhiteSpaces[i] = 0;
    } else {
      var firstBuffer = noWhiteSpaces[i];
      var secondBuffer = noWhiteSpaces[i + 1];
      var nextNumber = noWhiteSpaces[i + 2];
      var negativeNumber;

      if (noWhiteSpaces[i] === "") {
        return;
      }
      //Takes care of the minuses in the array
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
        //Adds a number to the 
      } else if (parseFloat(noWhiteSpaces[i])) {
        parsedNumber = parseFloat(noWhiteSpaces[i]);
        fixedMathExpression.push(parseFloat(noWhiteSpaces[i]));
        //Adds operators to the array
      } else {
        operator = noWhiteSpaces[i];
        fixedMathExpression.push(operator);
      }
    }
  }
  return fixedMathExpression;
}

function Calculate(fixedExpression) {
  for (i = 0; i <= fixedExpression.length - 2; i++) {
    var elementOfFixedExp = fixedExpression[i];
    switch (elementOfFixedExp) {
      case "+":
        result = fixedExpression[i - 1] + fixedExpression[i + 1];
        fixedExpression[i + 1] = result;
        break;

      case "-":
        result = fixedExpression[i - 1] - fixedExpression[i + 1];
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

numbers.addEventListener("click", collectDataFromDOM);
firstRow.addEventListener("click", collectDataFromDOM);




