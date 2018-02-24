import * as calcFunctions from './calcFunctions';
import './index.css';

function handleBtnClick(event) {
  const {
    handleAC,
    handleCE,
    handleDot,
    handleEquals,
    handleNumber,
    handleOperation,
  } = calcFunctions;
  const current = document.getElementById('current').textContent;
  const expr = document.getElementById('expression').textContent;
  const text = event.target.textContent;
  if (text === 'AC') {
    handleAC();
  } else if (text === 'CE') {
    handleCE(current, expr);
  } else if (text === '.') {
    handleDot(current, expr);
  } else if (text === '=') {
    handleEquals(current, expr);
  } else if (text == Number(text)) { // eslint-disable-line eqeqeq
    handleNumber(current, expr, text);
  } else {
    handleOperation(current, expr, text);
  }
  this.blur();
}

const btns = document.querySelectorAll('button');
btns.forEach(btn => btn.addEventListener('click', handleBtnClick));
