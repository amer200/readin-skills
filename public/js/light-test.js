const start = document.getElementById('start');
const plainText = document.getElementById('plainText');
const word = document.getElementById('word');
const wNum = document.getElementById('wNum').value;
const wordsArr = plainText.textContent.split(' ');
const wordPm = 300;
let i = 0;
start.addEventListener('click', () => {
    if (wNum == 1) {
        var t = setInterval(() => {
            word.innerHTML = `${wordsArr[i]}`;
            i = i + 1;
            if (!wordsArr[i]) {
                clearInterval(t)
                i = 0;
            }
        }, 300 * wNum)
    } else if (wNum == 2) {
        var t = setInterval(() => {
            word.innerHTML = `${wordsArr[i]} ${ (wordsArr[i + 1]) ? wordsArr[i + 1] : '' }`;
            i = i + 2;
            if (!wordsArr[i]) {
                clearInterval(t)
                return i = 0;
            }
        }, 300 * wNum)
    } else {
        var t = setInterval(() => {
            word.innerHTML = `${wordsArr[i]} ${ (wordsArr[i + 1]) ? wordsArr[i + 1] : '' } ${ (wordsArr[i + 2]) ? wordsArr[i + 2] : '' }`;
            i = i + 3;
            if (!wordsArr[i]) {
                clearInterval(t)
                i = 0;
            }
        }, 300 * wNum)
    }
})