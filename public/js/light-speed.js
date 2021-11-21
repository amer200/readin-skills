    // var quill = new Quill('#editor', {
    //     theme: 'snow'
    // });

    // const pragBtn = document.getElementById('pragBtn');
    // const prag = document.getElementById('prag');
    // const wordsDiv = document.getElementById('words');
    // const test = document.getElementById('test');
    // const repeat = document.getElementById('repeat');

    // function startTest() {
    //     const timeWord = document.getElementById('sec').value * 1000;
    //     var wordsArr = quill.getText().replace('\n', '').split(' ');
    //     prag.style.display = 'none';
    //     test.style.display = 'block';
    //     var counter = 0;
    //     var inst = setInterval(changeWord, timeWord);

    //     function changeWord() {
    //         wordsDiv.textContent = wordsArr[counter].replace('\n', '');
    //         counter++;
    //         if (counter >= wordsArr.length) {
    //             counter = 0;
    //             clearInterval(inst);
    //         }
    //     }
    //     changeWord()
    // }
    // pragBtn.addEventListener('click', startTest)
    // repeat.addEventListener('click', startTest)
    const lightForm = document.getElementById('lightForm');
    const start = document.getElementById('start');
    const wNum = document.getElementById('wNum');

    start.addEventListener('click', () => {
        if (wNum.value.length <= 0) {
            alert('حدد عدد الكلمات')
        } else {
            lightForm.submit();
        }
    })