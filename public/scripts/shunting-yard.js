import { operations, operate } from './calculator.js';

function postfixConversion(equation) {
    let stack = [], output = [];
    let precedence = '', antecedence = '';
    let infix = equation.replace(/\s+/g, ""); // Removes groups of whitespaces from the string
    infix = infix.split(/([\+\-\x\/\^\(\)])/); // Split into array of operator and operands tokens
    console.log("This is the infix" + infix);

    for (let i = 0; i < infix.length; i++) {
        let token = infix[i];
        
        switch(token) {
        case "(":
            stack.unshift(token);
            break;
        case ")":
            while (stack.length) {
                token = stack.shift();
                if (token === '(') break;
                else output.push(token);
            }

            if (token !== "(") {
                throw new Error("mismatched parenthesis");
            }
            break;
        default:
            if (token in operations) {
                while (stack.length) {
                    let punctuator = stack[0];

                    if (punctuator == "(") break;

                    let operator = operations[token];
                    precedence = operator.precedence;
                    antecedence = operations[punctuator].precedence;

                    if (precedence > antecedence ||
                        precedence === antecedence &&
                        operator.associativity === "Right") break;
                    else output.push(stack.shift());
                }
                stack.unshift(token);
            } else { // Token is numerical value
                output.push(token);
            }
        }
    }

    while (stack.length) { // Remaining stack 
        let token = stack.shift();
        if (token !== "(") output.push(token);
        else throw new Error("mismatched parentheses");
    }
    console.log(output);
    return output;
};

function evaluatePostfix(postfix) {
    let postfixStack = [];

    postfix.forEach(current => {
        if (current in operations) {
            let operand2 = postfixStack.pop();
            let operand1 = postfixStack.pop();
            postfixStack.push(
                operate(current, operand1, operand2)
            );
            console.log(postfixStack);
        } else {
            postfixStack.push(current);
            console.log(postfixStack);
        }
    });
    console.log(postfixStack);
    return postfixStack.shift();
};

export { postfixConversion, evaluatePostfix };