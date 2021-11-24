    // var quill = new Quill('#editor', {
    //     theme: 'snow'
    // });

    // const pragBtn = document.getElementById('pragBtn');
    // const prag = document.getElementById('prag');
    // const wordsDiv = document.getElementById('words');
    const lightForm = document.getElementById('lightForm');
    const start = document.getElementById('start');
    const wNum = document.getElementById('wNum');
    const speed = document.getElementById('speed');

    start.addEventListener('click', () => {
            if (!speed.value) {
                    alert('ادخل معدل سرعة القراءة')
            } else if (!wNum) {
                    alert('ادخل عدد الكلمات')
            } else {
                    lightForm.submit();
            }
    })