const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '×': (a, b) => a * b,
  '÷': (a, b) => a / b,
};

const isAnOperation = text => Object.keys(operations).includes(text);

const updateDisplay = (current, expr) => {
  document.getElementById('current').textContent = current;
  document.getElementById('expression').textContent = expr;
};

export const handleAC = () => {
  updateDisplay('0', '0');
};

export const handleCE = (current, expr) => {
  if (isAnOperation(current)) {
    const nextExpr = expr.slice(0, -1);
    const numbers = nextExpr.replace(/[^0-9.]/g, ',').split(',');
    updateDisplay(numbers[numbers.length - 1], nextExpr);
  } else if (current.length === 1 || expr.includes('=')) {
    updateDisplay('0', '0');
  } else {
    updateDisplay(current.slice(0, -1), expr.slice(0, -1));
  }
};

export const handleDot = (current, expr) => {
  if (current === '0' || expr.includes('=')) {
    updateDisplay('.', '.');
  } else if (!current.includes('.')) {
    updateDisplay(`${current}.`, `${expr}.`);
  }
};

export const handleEquals = (current, expr) => {
  const opSymbols = expr.match(/[^0-9.]/g);
  const numbers = expr.replace(/[^0-9.]/g, ',').split(',').map(Number);
  const firstNum = numbers.shift();
  const result = numbers.reduce((acc, num, i) =>
    operations[opSymbols[i]](acc, num), firstNum);
  const resultStr = String(result);
  if (result > 99999999) {
    updateDisplay('0', 'Digit Limit Met');
  } else if (resultStr.length > 8) {
    // round to fit on screen, then strip trailing zeros
    const nextCurrent = String(Number(result.toPrecision(7)));
    updateDisplay(nextCurrent, `${expr}=${nextCurrent}`);
  } else {
    updateDisplay(resultStr, `${expr}=${resultStr}`);
  }
};

export const handleNumber = (current, expr, num) => {
  if (current === '0') {
    updateDisplay(num, expr.slice(0, -1) + num);
  } else if (isAnOperation(current)) {
    updateDisplay(num, expr + num);
  } else if (expr.includes('=')) {
    updateDisplay(num, num);
  } else if (current.length === 8 || expr.length === 25) {
    updateDisplay('0', 'Digit Limit Met');
  } else {
    updateDisplay(current + num, expr + num);
  }
};

export const handleOperation = (current, expr, operation) => {
  if (expr.includes('=')) {
    updateDisplay(operation, current + operation);
  } else if (!isAnOperation(current)) {
    updateDisplay(operation, expr + operation);
  }
};
