//Initialize Quill editor 
// The activated editor functions
var toolbarOptions = [
    ['bold', 'italic'],
    [{
        'list': 'ordered'
    }, {
        'list': 'bullet'
    }],
    ['link', 'underline', 'blockquote', 'code-block'],
    [{
        align: ''
    }, {
        align: 'center'
    }, {
        align: 'right'
    }, {
        align: 'justify'
    }]
];
Quill.register('modules/counter', function (quill, options) {
    var container = document.querySelector(options.container);
    quill.on('text-change', function () {
        var text = quill.getText();
        if (options.unit === 'word') {
            container.innerText = (text.split(/\s+/).length - 1) + ' words';
        } else {
            container.innerText = text.length + ' characters';
        }
    });
});
// Quill configuration
var options = {
    modules: {
        counter: {
            container: '#counter',
            unit: 'word'
        },
        toolbar: toolbarOptions
    },
    readOnly: false,
    theme: 'snow'
};

// The quill instance
var editor = new Quill('#editor', options);
document.getElementById('submitBtn').addEventListener('click', () => {
    document.getElementById('hiddenContent').value = editor.root.innerHTML;
    document.getElementsByName('wordCount')[0].value = document.getElementById('counter').innerHTML.split('')[0];
    document.getElementById('addForm').submit();
})
// add quiz section

const quizTemp = `                   
<label for="about" class="form-label">السوؤال</label>
<input type="text" class="form-control" name="quiz" placeholder="السوؤال" required>
<input type="text" class="form-control" name="rightAnswer" placeholder="الاجابة الصحيحة" required>
<input type="text" class="form-control" name="wrongAnswerone" placeholder="اجابة خاطئة" required>
<input type="text" class="form-control" name="wrongAnswertwo" placeholder="اجابة خاطئة" required>
<div class="break"></div>`;

const root = document.getElementById('quiz');
const addQuizBtn = document.getElementById('addQuiz');

addQuizBtn.addEventListener( 'click', () => {
    const quizCon = document.createElement('div');
    quizCon.classList = 'mb-3';
    quizCon.innerHTML = quizTemp;
    root.appendChild(quizCon);
})