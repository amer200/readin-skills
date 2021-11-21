const start = document.getElementById('start');
const plainText = document.getElementById('plainText');
const word = document.getElementById('word');
const wordsArr = plainText.textContent.split(' ');
let i = 0;
start.addEventListener('click', () => {
   var t = setInterval(() => {
        word.textContent = wordsArr[i];
        return i++
    }, 1000)
    start.disabled = true;
    if (i >= 40) {
        clearInterval(t)
        start.disabled = false;
    }
})