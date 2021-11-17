const myForm = document.getElementById('myForm');
const subBtn = document.getElementById('subBtn');
const Lab = document.getElementById('Lab');
const brief = document.getElementById('brief');
const content = document.getElementById('content');
const about = document.getElementById('about');
about.addEventListener('click', () => {
    myForm.action = '/admin/about';
    Lab.innerHTML = 'عن بيئة التعلم';
});
brief.addEventListener('click', () => {
    myForm.action = '/admin/brief';
    Lab.innerHTML = 'السيرة الذاتية';
});

subBtn.addEventListener('click', () => {
    content.value = quill.root.innerHTML;
    myForm.submit();
})