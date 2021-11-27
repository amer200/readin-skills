// add quiz section
const quizTemp = `                   
<input type="text" class="form-control" name="qu" placeholder="اكتب السؤال ؟" required>
<input type="text" class="form-control" name="rA" placeholder="الاجابة الصحيحة" required>
<input type="text" class="form-control" name="wAo" placeholder="الاجابة الخطاء" required>
<input type="text" class="form-control" name="wAt" placeholder="الاجابة الخطاء" required>`;

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
const add = document.getElementById('add');
subBtn.addEventListener('click', () => {
    content.value = quill.root.innerHTML;
    wordCount.value = quill.getText().split(/\s+/).length - 1;
    plainText.value = quill.getText();
    myForm.submit()
})

// show lessons
const showL = document.getElementById('showL');
const les = document.getElementById('les');

showL.addEventListener('click', ()=>{
    myForm.style.display = 'none';
    les.style.display = 'block';
})
add.addEventListener('click', ()=>{
    myForm.style.display = 'block';
    les.style.display = 'none';
})
// remove lesson
const removeForm = document.getElementById('removeForm');
const removeBtn = document.getElementById('removeBtn');

removeBtn.addEventListener('click', ()=>{
    if(confirm('سوف يتم حذف الدرس و الاسئلة الخاصة به نهائيا هل انت متأكد ؟')){
        removeForm.submit()
    }
})

// rules
const readRBtn = document.getElementById('readRule');
const lightRBtn = document.getElementById('lightRule');
const readRoot = document.getElementById('readRoot');
const lightRoot = document.getElementById('lightRoot');
/* <input type="text" class="form-control" name="readRule" placeholder="تعليمات"> */
readRBtn.addEventListener('click', ()=>{
    const myE = document.createElement('input');
    myE.classList = 'form-control';
    myE.setAttribute('name', "readRule");
    myE.setAttribute('type', "text");
    myE.setAttribute('placeholder', "تعليمات");
    readRoot.appendChild(myE);
})
lightRBtn.addEventListener('click', ()=>{
    const myE = document.createElement('input');
    myE.classList = 'form-control';
    myE.setAttribute('name', "lightRule");
    myE.setAttribute('type', "text");
    myE.setAttribute('placeholder', "تعليمات");
    lightRoot.appendChild(myE);
})
