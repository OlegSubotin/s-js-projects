let passwordEl = document.querySelector('.password');
const copyBtn = document.getElementById('copy-btn');
const lengthEl = document.getElementById('length');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const generateBtn = document.querySelector('.generate-btn');

const upperLetters = 'ABCDEFGHIJKLMNOPQRST';
const lowerLetters = 'abcdefghijklmnopqrst';
const numbers = '1234567890';
const symbols = '!@#$%^&*(){}[]:;/.,';

copyBtn.addEventListener("click", copyPassword);
generateBtn.addEventListener("click", generatePassword);

function getUpperLetters() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
};

function getLowerLetters() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
};

function getNumbers() {
    return numbers[Math.floor(Math.random() * numbers.length)];
};

function getSymbols() {
    return symbols[Math.floor(Math.random() * symbols.length)];
};

function copyPassword () {
    const textarea = document.createElement("textarea");
    const password = passwordEl.innerText;

    if (!password) {
        return;
    };

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard");
};

function generatePassword() {
    let password = '';

    if (numberEl.checked) {
        password += getNumbers();
    };
    if (symbolEl.checked) {
        password += getSymbols();
    };
    if (upperEl.checked) {
        password += getUpperLetters();
    };
    if (lowerEl.checked) {
        password += getLowerLetters();
    };
    for (let i = 0; i < lengthEl.value; i += 1){
        const element = generateElement();
        password += element;
    };
    passwordEl.innerText = password;
};

function generateElement() {
    let elementArr = [];
    if (numberEl.checked) {
        elementArr.push(getNumbers());
    };
    if (symbolEl.checked) {
        elementArr.push(getSymbols());
    };
    if (lowerEl.checked) {
        elementArr.push(getLowerLetters());
    };
    if (upperEl.checked) {
        elementArr.push(getUpperLetters());
    };
    if (elementArr.length === 0) {
        return '';
    };
    return elementArr[Math.floor(Math.random() * elementArr.length)]
}