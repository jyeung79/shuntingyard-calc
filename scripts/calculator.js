 // Instantiate all global variables
let displayString = "";
let currentOperand = 0;
let justCleared = true; // Flag for determining if operations are new or cleared
let pressedOperator = false; // Flag to determine if new values are entered instead of operators
let operands = [];
let operators = [];

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
        return console.log("Invalid entries. Try again using numerical values.");
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

function display() {
    const btns = document.querySelectorAll('button');

    btns.forEach((button) => {
        button.addEventListener('click', (e) => {
            pressBtn(button.id);
            screen.textContent = displayString;
        });
    });
}

// How do I replace the 0 when another number is pressed
// How do I store the operands and operators?
// HOw do I use the operators to store the operands and keep track of placement?
// How to calculate the values in a sequence?

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
            clickOperator('divide');
            displayString = displayString + ' / ';
            break;
        case 'multiply':
            clickOperator('multiply');
            displayString = displayString + ' x ';
            break;
        case 'subtract':
            clickOperator('subtract');
            displayString = displayString + ' - ';
            break;
        case 'plus':
            clickOperator('plus');
            displayString = displayString + ' + ';
            break;
        case 'clear':
            displayString = '0';
            justCleared = true;
            break;
        case 'plusminus':
            displayString = '-' + displayString;
            break;
        case 'percent':
            displayString = displayString + '%';
            break;
        case 'decimal':
            displayString = displayString + '.';
            break;
        case 'equal':
            displayString = '0';
            break;
        default:
            displayString = '0';
            break;
    }
    return displayString;
}

function clickOperator(typeOfOperation) {
    // Operand is stored into currentOperand
    // Need to store it into the operands array
    let j = operands.length;
    let k = operators.length;

    if (pressedOperator == false) {
        // Check to see if an operator has been pressed twice. If it has then the new operator should replace the other operator
        operands[j] = currentOperand;
        operators[k] = typeOfOperation;
        currentOperand = 0; // Set current Operand to zero
        pressedOperator = true;
    } else {
        operators[k-1] = typeOfOperation;
        pressedOperator = true;
    }
}

function clickNumber(number) {
    // Check if the value is not a 0
    if (justCleared && number != 0) {
        currentOperand = number;
        justCleared = false;
        displayString = currentOperand.toString();
    } else if (justCleared && number == 0) { //Make sure display does not change
        currentOperand = 0;
        displayString = '0';
    } else {
        currentOperand = currentOperand*10 + number;
        displayString = displayString + number.toString();
    }

    pressedOperator = false; // Keep in mind of this flag
    console.log(currentOperand);
}

function clear() {
    display = "";
}