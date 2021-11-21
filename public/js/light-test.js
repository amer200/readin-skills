const start = document.getElementById('start');
const plainText = document.getElementById('plainText');
const word = document.getElementById('word');
const wNum = document.getElementById('wNum').value;
const wordsArr = plainText.textContent.split(' ');
let i = 0;
const time = (60 / +wNum) * 1000;
start.addEventListener('click', () => {
    var t = setInterval(() => {
        word.textContent = wordsArr[i];
        i++
    }, time)
    start.disabled = true;
})