function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0){
        alert('Learn Math. You Almost Broke The System (⊙▂⊙✖ )');
        divideByZero = 1;
        clear();
        return;
    }
    return a / b;
}

function operate(optr, opnd1, opnd2) {
    if (optr === '*') return multiply(opnd1, opnd2);
    else if (optr === '+') return add(opnd1, opnd2);
    else if (optr === '-') return subtract(opnd1, opnd2);
    else if (optr === '/') return divide(opnd1, opnd2);
}

const screen = document.querySelector('.screen .curr-display');
let operator, firstOperand = 0, secondOperand;
let currStage = 0;
let divideByZero = 0;
let currOperated = 0;

function clear() {
    firstOperand = 0;
    currOperated = 0;
    currStage = 0;
    screen.textContent = 0;
}

function computeClick() {
    
    let currKey = this.textContent? this.textContent : currEvent.key;

    if (currKey === '×') currKey = '*';
    else if (currKey === '÷') currKey = '/';
    else if (currKey === 'Enter') currKey = '=';

    let hasOperator = 0;

    if (currKey == '*' || currKey == '-' || currKey == '+' || currKey == '/' || currKey == '=' || currKey == '.') hasOperator = 1;
    if (!hasOperator && +currKey != currKey) return;

    if (!hasOperator && currKey != '.') currKey = Number(currKey);

    if (currStage != 3 && currKey == '=' || currKey === '.' && screen.textContent.includes('.')) return;

    if (currStage == 0 && !hasOperator) {
        screen.textContent = currKey;
        currStage = 1;
        firstOperand = currKey;
    }
    else if (currStage == 0 && hasOperator) {
        screen.textContent += currKey;
        currStage = 2;
        operator = currKey;
    }
    else if (currStage == 1 && hasOperator) {
        screen.textContent += currKey;
        currStage = 2;
        operator = currKey;
    }
    else if (currStage == 1 && !hasOperator) {
        if (currOperated) {
            currOperated = 0;
            screen.textContent = currKey;
        }
        else screen.textContent += currKey;
        firstOperand = Number(screen.textContent);
    }
    else if (currStage == 2 && !hasOperator) {
        screen.textContent += currKey;
        currStage = 3;
        secondOperand = currKey;
    }
    else if (currStage == 2 && hasOperator) {
        let arrChar = screen.textContent.split('');
        arrChar.splice(screen.textContent.length - 1, 1, currKey);
        screen.textContent = arrChar.join('');
        operator = currKey;
    }
    else if (currStage == 3 && !hasOperator) {
        let arrChar = screen.textContent.split(operator);
        arrChar[1] += currKey;
        secondOperand = Number(arrChar[1]);
        screen.textContent = arrChar.join(operator);
    }
    else if (currStage == 3 && currKey === '=') {
        screen.textContent = +operate(operator, firstOperand, secondOperand).toFixed(3);
        if (divideByZero) return;
        firstOperand = Number(screen.textContent);
        currOperated = 1;
        currStage = 1;
    }
    else if (currStage == 3 && hasOperator) {
        screen.textContent = +operate(operator, firstOperand, secondOperand).toFixed(4);
        if (divideByZero) return;
        firstOperand = Number(screen.textContent);
        screen.textContent += currKey;
        operator = currKey;
        currStage = 2;
    }
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', computeClick)
})

document.querySelector('#clear').addEventListener('click', clear);

let currEvent;
document.addEventListener("keydown", (e) => {
    currEvent = e;
    e.preventDefault();
    computeClick();
});