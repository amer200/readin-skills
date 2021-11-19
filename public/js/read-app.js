const timer = document.getElementById('timer');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
let t;
// timer function
function timerFun(startTime) {
    t = setInterval(() => {
        var delta = Math.floor(Date.now()) - Math.floor(startTime);
        timer.innerHTML = `عداد الزمن: ${Math.floor(delta / 1000)}`;
    }, 1000);
}
start.addEventListener('click', () => {
    if (timer.textContent.split(' ')[2]) {
        t = setInterval(() => {
            var startTime = timer.textContent.split(' ')[2];
            timer.innerHTML = `عداد الزمن: ${+startTime + 1}`;
        }, 1000);
    }else{
        timerFun(Date.now());
    }
    start.disabled = true
});
stop.addEventListener('click', () => {
    console.log();
    clearInterval(t);
    start.disabled = false
})