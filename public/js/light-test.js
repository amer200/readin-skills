const start = document.getElementById('start');
const plainText = document.getElementById('plainText');
const word = document.getElementById('word');
const wNum = document.getElementById('wNum').value;
const wordsArr = plainText.textContent.split(' ');
const speed = document.getElementById('speed');
const wordPm = (60 / speed.value) * 1000;
let i = 0;
start.addEventListener('click', () => {
    if (wNum == 1) {
        start.disabled = true;
        var t = setInterval(() => {
            word.innerHTML = `${wordsArr[i]}`;
            i = i + 1;
            if (!wordsArr[i]) {
                clearInterval(t)
                start.disabled = false;
                i = 0;
            }
        }, wordPm * wNum)
    } else if (wNum == 2) {
        start.disabled = true;
        var t = setInterval(() => {
            word.innerHTML = `${wordsArr[i]} ${ (wordsArr[i + 1]) ? wordsArr[i + 1] : '' }`;
            i = i + 2;
            if (!wordsArr[i]) {
                start.disabled = false;
                clearInterval(t)
                return i = 0;
            }
        }, wordPm * wNum)
    } else {
        start.disabled = true;
        var t = setInterval(() => {
            word.innerHTML = `${wordsArr[i]} ${ (wordsArr[i + 1]) ? wordsArr[i + 1] : '' } ${ (wordsArr[i + 2]) ? wordsArr[i + 2] : '' }`;
            i = i + 3;
            if (!wordsArr[i]) {
                start.disabled = false;
                clearInterval(t)
                i = 0;
            }
        }, wordPm * wNum)
    }
})