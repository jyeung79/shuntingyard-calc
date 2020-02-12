let operations = {
    '^': {precedence:4, associativity: 'Right'},
    '/': {precedence:3, associativity: 'Left'},
    'x': {precedence:3, associativity: 'Left'},
    '+': {precedence:2, associativity: 'Left'},
    '-': {precedence:2, associativity: 'Left'},
}

function postfixConversion(equation) {
    let token = '';
    let infixStack = [];
    let postfix = [];
    let operator1 = '';
    let operator2 = '';
    let infix = equation.replace(/\s+/g, ""); // Removes groups of whitespaces from the string
    infix = infix.split(/([\+\-\x\/\^\(\)])/).clean(); // Split into array of operator and operands tokens
    console.log(infix);

    for (let i = 0; i < infix.length; i++) {
        token = infix[i];
        
        if (token.isNumeric() == true) { // Checks if this is a number
            postfix.push(token);

        } else if (infix.indexOf(token) != -1) { // Checks if it is an operator that is present
            operator1 = token;
            operator2 = infixStack.peek();

            while (operator2 in operations && ((operations[operator1].associativity == 'Left' && 
                (operations[operator1].precedence <= operations[operator2].precedence)) ||
                (operations[operator1].associativity == 'Right' && 
                (operations[operator1].precedence < operation[operator2].precedence))))
            {    
                postfix.push(operator2);
                infixStack.pop();
                operator2 = infixStack.peek();
            }
            infixStack.push(operator1);

        } else if (token == '(') {
            infixStack.push(token);
        } else if (token == ')') {
            while (infixStack.peek() != '(') {
                postfix += infixStack.pop();
            }
            infixStack.pop();
        }
    }
    //postfix += infixStack.reverse().join();
    return postfix;
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

Array.prototype.peek = function () {
    return this[this.length - 1];
}