 // Instantiate all global variables
let displayString = "0"; // String displayed on calculator
let currentOperand = "0"; // String for current operand
let pressedOperator = false; // Flag to determine if new values are entered instead of operators
let pressedDecimal = false; // Flag to determine if operand has a decimal pressed
let pressedBracket = false; // Flag to make sure brakcets match
let keys = {'*':'Multiply', '^':'Power', 'x':'Multiply', '/':'Divide', '-':'Subtract', '+':'Plus',
    'C':'Clear', 'c':'Clear', '(':'Brackets', ')':'Brackets', '.':'Decimal', '=':'Equal', 'Enter':'Equal'};

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
            changeFontsize();
        });
    });

    document.addEventListener('keydown', (e) => {
        keyPress(e);
        console.log(e.code);
        console.log(e.key);
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
        case 'Brackets': // TODO implement left and right bracket
            clickBrackets();
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
}

function keyPress(event) {
    if (event.key >= 0 && event.key <= 9) {
        pressBtn(event.code);
    } else if (event.key in keys) {
        pressBtn(keys[event.key]);
    }
}

function clickOperator(symbol) {
    // Operand is stored into currentOperand
    let length = displayString.length;

    if (!pressedOperator) {
        // Checks to see if a number has been entered
        currentOperand = ""; // Set current Operand to NaN
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
    if (currentOperand === "") {
        currentOperand = number;
        displayString = displayString + currentOperand.toString();
    } else if (currentOperand === '0') { //Make sure display does not change
        if (number === "0") {
            currentOperand = "0";
        } else {
            currentOperand = number;
            if (pressedBracket) displayString = displayString + currentOperand.toString();                
            else displayString = displayString.slice(0,length-1) + currentOperand.toString();
        }
    } else { // Includes if currentOperand has a decimal
        currentOperand += number;
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
        currentOperand += '.';
        displayString = displayString + '.';
        pressedDecimal = true;
    }
}

function clear() {
    currentOperand = "0";
    displayString = currentOperand.toString();
    pressedOperator = false;
    pressedDecimal = false;
}

function changeFontsize() {
    let eqnLength = displayString.length;

    if (eqnLength <= 12) {
        screen.style.fontSize = "55px";
    } else if (eqnLength > 12 && eqnLength <= 17) {
        screen.style.fontSize = "47px";
    } else if (eqnLength > 17 && eqnLength <= 20) {
        screen.style.fontSize = "40px"
    } else {
        screen.style.fontSize = "35px";
        screen.style.textAlignLast = "right";
    }
}

main();