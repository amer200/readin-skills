const timer = document.getElementById('timer');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const end = document.getElementById('end');
const prag = document.getElementById('prag');
const speed = document.getElementById('speed');
const testSubmit = document.getElementById('testSubmit');
const wordCount = document.getElementById('wordcount').value;
const testForm = document.getElementById('testForm');
end.disabled = true;
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
    } else {
        timerFun(Date.now());
    }
    start.disabled = true;
    end.disabled = false;
    prag.style.opacity = '1';
});
stop.addEventListener('click', () => {
    clearInterval(t);
    start.disabled = false;
    prag.style.opacity = '0';
});
end.addEventListener('click', () => {
        clearInterval(t);
        start.disabled = true;
        stop.disabled = true;
        prag.style.opacity = '0';
    
})
testSubmit.addEventListener('click', () => {
    const userTime = timer.textContent.split(' ')[2];
    const averageSpeed = Math.round((wordCount * 1) / (+userTime / 60));
    speed.value = averageSpeed;
    testForm.submit();
})