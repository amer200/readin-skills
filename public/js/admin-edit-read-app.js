// add quiz section
const quizTemp = `                   
<input type="text" class="form-control" name="qu" placeholder="اكتب السؤال ؟" required>
<input type="text" class="form-control" name="rA" placeholder="الاجابة الصحيحة" required>
<input type="text" class="form-control" name="wAo" placeholder="الاجابة الخطاء" required>
<input type="text" class="form-control" name="wAt" placeholder="الاجابة الخطاء" required>
<button type="button" id="removeQuiz" class="btn btn-danger" onclick="this.parentElement.remove()">احذف السؤال</button>`;

const root = document.getElementById('quizs');
const addQuizBtn = document.getElementById('addQuiz');

addQuizBtn.addEventListener('click', () => {
    const quizCon = document.createElement('div');
    quizCon.classList = 'quiz';
    quizCon.innerHTML = quizTemp;
    root.appendChild(quizCon);
})

// submit form add les
const subBtn = document.getElementById('subBtn');
const qu = document.getElementsByName('qu');
const wAo = document.getElementsByName('wAo');
const wAt = document.getElementsByName('wAt');
const content = document.getElementById('content');
const wordCount = document.getElementById('wordCount');
const plainText = document.getElementById('plainText');

subBtn.addEventListener('click', () => {
    content.value = quill.root.innerHTML;
    wordCount.value = quill.getText().split(/\s+/).length - 1;
    plainText.value = quill.getText();
    myForm.submit()
})