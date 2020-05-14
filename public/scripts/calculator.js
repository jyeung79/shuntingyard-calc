import { postfixConversion, evaluatePostfix } from './shunting-yard.js';

// Instantiate all global variables
let displayString = "0"; // String displayed on calculator
let currentOperand = "0"; // String for current operand
let pressedOperator = false; // Flag to determine if new values are entered instead of operators
let pressedDecimal = false; // Flag to determine if operand has a decimal pressed
let leftBrackets = 0; // Flag that measure how many left brackets
let rightBracket = false; // Flag to make sure operands don't appear right after
let pressedEqual = false; // Received result of calculation

const keys = {'*':'Multiply', '^':'Power', 'x':'Multiply', '/':'Divide', '-':'Subtract', '+':'Plus',
    'C':'Clear', 'c':'Clear', '(':'LeftBracket', ')':'RightBracket', '.':'Decimal', '=':'Equal', 'Enter':'Equal'};

const operations = {
    '^': {precedence:4, associativity: 'Right'},
    '/': {precedence:3, associativity: 'Left'},
    'x': {precedence:3, associativity: 'Left'},
    '+': {precedence:2, associativity: 'Left'},
    '-': {precedence:2, associativity: 'Left'},
};

const screen = document.querySelector('#calc-display');

// TODO Think if there is a better way than to have two if statements to detect undefined or string operators
const add = (a,b) => (a + b).toString();
const subtract = (a, b) => (a - b).toString();
const multiply =(a, b) => (a * b).toString();
const divide = (a, b) => (a / b).toString();
const power = (a, b) => (a ** b).toString();

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
        currentOperand = displayString;
        pressedEqual = true;
    }
    changeFontsize();
}

function main() {
    const btns = document.querySelectorAll('button');

    btns.forEach((button) => {
        button.addEventListener('click', (e) => {
            pressBtn(button.id);
            screen.textContent = displayString;
            changeFontsize();
        });
    });

    document.addEventListener('keydown', (e) => {
        keyPress(e);
        screen.textContent = displayString;
        changeFontsize();
    });
}

function pressBtn (btnID) {
    switch(btnID) {
        case 'Digit0':
            clickNumber('0');
            break;
        case 'Digit1':
            clickNumber('1');
            break;
        case 'Digit2':
            clickNumber('2');
            break;
        case 'Digit3':
            clickNumber('3');
            break;
        case 'Digit4':
            clickNumber('4');
            break;
        case 'Digit5':
            clickNumber('5');
            break;
        case 'Digit6':
            clickNumber('6');
            break;
        case 'Digit7':
            clickNumber('7');
            break;
        case 'Digit8':
            clickNumber('8');
            break;
        case 'Digit9':
            clickNumber('9');
            break;
        case 'Divide':
            clickOperator('/');
            break;
        case 'Multiply':
            clickOperator('x');
            break;
        case 'Subtract':
            clickOperator('-');
            break;
        case 'Plus':
            clickOperator('+');
            break;
        case 'Clear':
            clear();
            break;
        case 'LeftBracket':
            clickBrackets('(');
            break;
        case 'RightBracket':
            clickBrackets(')');
            break;
        case 'Power':
            clickOperator('^');
            break;
        case 'Decimal':
            clickDecimal();
            break;
        case 'Equal':
            equal();
            break;
        default:
            break;
    }
    return displayString;
};

function keyPress(event) {
    if (event.key >= 0 && event.key <= 9) {
        pressBtn(event.code);
    } else if (event.key in keys) {
        pressBtn(keys[event.key]);
    }
};

function clickOperator(symbol) {
    // Operand is stored into currentOperand
    let length = displayString.length;
    if (pressedEqual === true && !displayString.isNumeric()) clear();
    else pressedEqual = false;

    if (!pressedOperator) {
        currentOperand = "";
        pressedDecimal = false;
        displayString = displayString + ' ' + symbol + ' ';
    } else {
        let replaceOperator = displayString.slice(0, length-2);
        displayString = replaceOperator + symbol + ' ';
    }
    pressedOperator = true;
    rightBracket = false;
};

function clickNumber(number) {
    if (pressedEqual === true) clear();
    else pressedEqual = false;

    if (currentOperand === "") {
        if (rightBracket) {}
        else {
            currentOperand = number;
            displayString = displayString + currentOperand.toString();
        }
    } else if (currentOperand === '0') { //Make sure display does not change
        if (number === "0") {
            currentOperand = "0";
        } else {
            currentOperand = number;
            displayString = displayString.slice(0,length-1) + currentOperand.toString();
        }
    } else { // Includes if currentOperand has a decimal
        currentOperand += number;
        displayString = displayString + number.toString();
    }
    pressedOperator = false; // Keep in mind of this flag
    console.log(currentOperand);
};

// TODO - Fix issue with no operator or operations inside brackets
function clickBrackets(symbol) {
    // Check which bracket pressed
    switch(symbol) {
        case '(':
            // When cleared
            if (displayString === '0') {
                displayString = '(';
                currentOperand = "";
                leftBrackets++;
                rightBracket = false;
            } else if (currentOperand === '' && !rightBracket) { // this includes clicked on operators or pressed left bracket
                displayString = displayString + '(';
                leftBrackets++;
                rightBracket = false;
            } break;
        case ')':
            if (leftBrackets > 0 && !pressedOperator) {
                displayString = displayString + ')';
                currentOperand = "";
                leftBrackets--;
                rightBracket = true;
            } break;
        default:
            break;
    }
};

function clickDecimal() {
    if (!pressedDecimal) {
        currentOperand += '.';
        displayString = displayString + '.';
        pressedDecimal = true;
    }
};

function clear() {
    currentOperand = "0";
    displayString = currentOperand.toString();
    pressedOperator = false;
    pressedDecimal = false;
    rightBracket = false;
    pressedEqual = false;
};

function changeFontsize() {
    let eqnLength = displayString.length;
    console.log(displayString.length);

    if (eqnLength <= 10) {
        screen.style.fontSize = "55px";
    } else if (eqnLength > 10 && eqnLength <= 15) {
        screen.style.fontSize = "47px";
    } else if (eqnLength > 15 && eqnLength <= 18) {
        screen.style.fontSize = "40px"
    } else if (eqnLength > 18 && eqnLength <= 20) {
        screen.style.fontSize = "35px";
    } else {
        screen.style.fontSize = "30px";
        screen.style.textAlignLast = "right";
    }
};

main();

export { operations, operate };