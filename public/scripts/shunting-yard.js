let operations = {
    '^': {precedence:4, associativity: 'Right'},
    '/': {precedence:3, associativity: 'Left'},
    'x': {precedence:3, associativity: 'Left'},
    '+': {precedence:2, associativity: 'Left'},
    '-': {precedence:2, associativity: 'Left'},
}

function postfixConversion(equation) {
    let stack = [];
    let output = [];
    let infix = equation.replace(/\s+/g, ""); // Removes groups of whitespaces from the string
    infix = infix.split(/([\+\-\x\/\^\(\)])/).clean(); // Split into array of operator and operands tokens
    console.log(infix);

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
            if (operations.hasOwnProperty(token)) {
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
}

function evaluatePostfix(postfix) {
    let postfixStack = [];

    postfix.forEach( function(current) {
        if (operations.hasOwnProperty(current)) {
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
}


String.prototype.isNumeric = function() {
    return !isNaN(parseFloat(this)) && isFinite(this);
}

Array.prototype.clean = function() {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == '') {
            this.splice(i, 1);
        }
    }
    return this;
}