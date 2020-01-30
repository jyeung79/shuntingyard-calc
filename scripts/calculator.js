 // Instantiate all global variables
let displayString = "";
let currentOperand = 0;
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

function equal(operandList, operatorList) {
    let result = [];

    if (currentOperand == NaN) {
        break;
    } else {
        let j = operandList.length;
        operandList[j] = currentOperand;
        
        for (i=0; i < operatorList.length; i++) {
            if ( operatorList[i] == 'multiply' || operatorList[i] == 'divide'){
                result.push(operate(operatorList[i], operandList[i], operandList[i+1]));
            } else {
                result.push(operandList[i]);                                                                                                                                                                                                                   
            }
        }
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

function clickOperator(typeOfOperation, symbol) {
    // Operand is stored into currentOperand
    // Need to store it into the operands array
    let j = operands.length;
    let k = operators.length;
    let length = displayString.length;

    if (!pressedOperator) {
        // Checks to see if a number has been entered
        operands[j] = currentOperand;
        operators[k] = typeOfOperation;
        currentOperand = NaN; // Set current Operand to zero
        displayString = displayString + ' ' + symbol + ' ';
    } else {
        operators[k-1] = typeOfOperation;
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
    operands = [];
    operators = [];
    pressedOperator = false;
}