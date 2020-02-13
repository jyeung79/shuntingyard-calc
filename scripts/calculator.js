 // Instantiate all global variables
let displayString = "";
let currentOperand = 0;
let pressedOperator = false; // Flag to determine if new values are entered instead of operators
let pressedDecimal = false; // Flag to determine if operand has a decimal pressed
let pressedBracket = false; // Flag to make sure brakcets match

const screen = document.querySelector('#calc-display');

// TODO Think if there is a better way than to have two if statements to detect undefined or string operators
function add(a,b) { return (a + b).toString();}
function subtract(a,b) { return (a - b).toString();}
function multiply(a,b) { return (a * b).toString();}
function divide(a,b) { return (a / b).toString();}
function power(a,b) { return (a ** b).toString();}

function operate(operation, num1, num2) {
    switch (operation) {
        case '+': return add(parseFloat(num1), parseFloat(num2));
        case '-': return subtract(parseFloat(num1), parseFloat(num2));
        case 'x': return multiply(parseFloat(num1), parseFloat(num2));
        case '/': return divide(parseFloat(num1), parseFloat(num2));
        case '^' : return power(parseFloat(num1), parseFloat(num2));
        default:
            console.log("Issue occured. Please try again.");
    }
    return result;
}

function equal() {
    console.log(displayString);
    if (pressedOperator == false) {
        let output = postfixConversion(displayString);
        displayString = evaluatePostfix(output);
    }
}

function main() {
    const btns = document.querySelectorAll('button');

    btns.forEach((button) => {
        button.addEventListener('click', (e) => {
            pressBtn(button.id);
            screen.textContent = displayString;
        });
    });
}

function pressBtn (btnID) {
    switch(btnID) {
        case 'zero':
            clickNumber(0);
            break;
        case 'one':
            clickNumber(1);
            break;
        case 'two':
            clickNumber(2);
            break;
        case 'three':
            clickNumber(3);
            break;
        case 'four':
            clickNumber(4);
            break;
        case 'five':
            clickNumber(5);
            break;
        case 'six':
            clickNumber(6);
            break;
        case 'seven':
            clickNumber(7);
            break;
        case 'eight':
            clickNumber(8);
            break;
        case 'nine':
            clickNumber(9);
            break;
        case 'divide':
            clickOperator('/');
            break;
        case 'multiply':
            clickOperator('x');
            break;
        case 'subtract':
            clickOperator('-');
            break;
        case 'plus':
            clickOperator('+');
            break;
        case 'clear':
            clear();
            break;
        case 'brackets':
            clickBrackets();
            break;
        case 'power':
            clickOperator('^');
            break;
        case 'decimal':
            clickDecimal();
            break;
        case 'equal':
            equal();
            break;
        default:
            displayString = '0';
            break;
    }
    return displayString;
}

function clickOperator(symbol) {
    // Operand is stored into currentOperand
    let length = displayString.length;

    if (!pressedOperator) {
        // Checks to see if a number has been entered
        currentOperand = NaN; // Set current Operand to NaN
        pressedDecimal = false;
        displayString = displayString + ' ' + symbol + ' ';
    } else {
        let replaceOpStr = displayString.slice(0, length-2);
        displayString = replaceOpStr + symbol + ' ';
    }
    pressedOperator = true;
}

function clickNumber(number) {
    // Check if the value is not a 0
    if (currentOperand == NaN) {
        currentOperand = number;
        displayString = displayString + currentOperand.toString();
    } else if (currentOperand == 0) { //Make sure display does not change
        if (number == 0) {
            currentOperand = 0;
        } else {
            currentOperand = number;
            if (pressedBracket) displayString = displayString + currentOperand.toString();                
            else displayString = displayString.slice(0,length-1) + currentOperand.toString();
        }
    } else {
        currentOperand = currentOperand*10 + number;
        displayString = displayString + number.toString();
    }
    pressedOperator = false; // Keep in mind of this flag
    console.log(currentOperand);
}

// TODO - Fix issue with no operator or operations inside brackets
function clickBrackets() {
    if (displayString === "0"){
        displayString = '(';
        pressedBracket = true;
    } else if (pressedBracket) {
            if (!pressedOperator && currentOperand != NaN){
                displayString = displayString + ' ) ';
                pressedBracket = false;
            }
    } else {
        displayString = displayString + ' ( ';
        pressedBracket = true;
    }
}

function clickDecimal() {
    if (!pressedDecimal) {
        displayString = displayString + '.';
        pressedDecimal = true;
    }
}

function clear() {
    currentOperand = 0;
    displayString = currentOperand.toString();
    pressedOperator = false;
}

