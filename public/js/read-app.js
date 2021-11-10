const modalBtn = document.getElementById('modalBtn');
const endBtn = document.getElementById('endApp');
const modal = document.getElementById('modal');
const page = document.getElementById('page');
const timerBox = document.getElementById('timer');
const wordsNum = document.getElementById('prag').innerHTML.split(' ').length;

modalBtn.addEventListener('click', () => {
    var start = Date.now();
    modal.classList = 'd-none';
    page.classList = 'page';
    var timer = setInterval(function() {
        var delta = Date.now() - start;
        timerBox.innerHTML = Math.floor(delta / 1000);
    }, 1000);
})
endBtn.addEventListener('click', () => {
    const time = timer.textContent;
    const timeInminute = time / 60;
    return average = (wordsNum * 1) / timeInminute;
    //console.log(`معدل سرعة القراءة = ${average} في الدقيقة`);
})