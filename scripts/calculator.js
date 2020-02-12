 // Instantiate all global variables
let displayString = "";
let currentOperand = 0;
let pressedOperator = false; // Flag to determine if new values are entered instead of operators
let decimalPressed = false; // Flag to determine if operand has a decimal pressed

const screen = document.querySelector('#calc-display');

// TODO Think if there is a better way than to have two if statements to detect undefined or string operators
function add(num1, num2) {
    if (typeof(num1) == 'string' || typeof(num2) == 'string') {
        return console.log('Detected string entries. Try again using numerical values.');
    } else {
        return num1+num2;
    }
}

function subtract(num1, num2) {
    if (typeof(num1) == 'string' || typeof(num2) == 'string') {
        return console.log('Detected strings entries. Try again using numerical values.');
    } else {
        return num1 - num2;
    }
}

function multiply(num1, num2) {
    if (typeof(num1) == 'string' || typeof(num2) == 'string') {
        return console.log('Detected string entries. Try again using numerical values.');
    } else {
        return num1*num2;
    }
}

function divide(num1, num2) {
    if (typeof(num1) == 'string' || typeof(num2) == 'string') {
        return console.log('Detected string entries. Try again using numerical values');
    } else {
        return num1/num2;
    }
}

function operate(operation, num1, num2) {
    let result = 0;
    switch (operation) {
        case 'add':
            result = add(num1, num2);
            break;
        case 'subtract':
            result = subtract(num1, num2);
            break;
        case 'multiply':
            result = multiply(num1, num2);
            break;
        case 'divide':
            result = divide(num1, num2);
            break;
        default:
            console.log("Issue occured. Please try again.");
    }
    return result;
}

function equal() {
    console.log(displayString);
    if (pressedOperator == false) {
        postfixConversion(displayString);
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
            clickOperator('divide', '/');
            break;
        case 'multiply':
            clickOperator('multiply', 'x');
            break;
        case 'subtract':
            clickOperator('subtract', '-');
            break;
        case 'plus':
            clickOperator('plus', '+');
            break;
        case 'clear':
            clear();
            break;
        case '(':
            displayString = displayString + '(' + ' ';
            break;
        case ')':
            displayString = displayString + ')' + ' ';
            break;
        case 'decimal':
            displayString = displayString + '.' + ' ';
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

function clickOperator(typeOfOperation, symbol) {
    // Operand is stored into currentOperand
    let length = displayString.length;

    if (!pressedOperator) {
        // Checks to see if a number has been entered
        currentOperand = NaN; // Set current Operand to NaN
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
            let replaceStr = displayString.slice(0, length-1);
            displayString = replaceStr + currentOperand.toString();
        }
    } else {
        currentOperand = currentOperand*10 + number;
        displayString = displayString + number.toString();
    }
    pressedOperator = false; // Keep in mind of this flag
    console.log(currentOperand);
}

function clear() {
    currentOperand = 0;
    displayString = currentOperand.toString();
    pressedOperator = false;
}

