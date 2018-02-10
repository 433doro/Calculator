function collectDataFromDOM(event)
{
    var clickInput = event.target.value;
    isNumberOrOperator(clickInput);
}

function isNumberOrOperator(userInput)
{
    if((userInput>=0 && userInput<=9) || userInput !== "delete" || userInput !== "=")
        {
            DOMInput.push(userInput);
            console.log(userInput);
        }
}




var numbers = document.getElementById("numbers");
var firstRow = document.getElementById("first-rows");
var DOMInput = [];

numbers.addEventListener("click",collectDataFromDOM);
firstRow.addEventListener("click",collectDataFromDOM);
document.querySelector("#eqn-bg").addEventListener("click",result)


