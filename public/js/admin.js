const myFormBrief = document.getElementById('myFormBrief');
const subBtnBrief = document.getElementById('subBtnBrief');
const myFormAbout = document.getElementById('myFormAbout');
const subBtnAbout = document.getElementById('subBtnAbout');
const brief = document.getElementById('brief');
const content = document.getElementById('content');
const about = document.getElementById('about');
const editor = document.getElementById('editor');

brief.addEventListener('click', () => {
    myFormBrief.action = '/admin/brief';
    myFormBrief.style.display = 'block';
    myFormAbout.style.display = 'none';
});

subBtnBrief.addEventListener('click', () => {
    content.value = quill.root.innerHTML;
    myFormBrief.submit();
});

about.addEventListener('click', () => {
    myFormAbout.action = '/admin/about';
    myFormBrief.style.display = 'none';
    myFormAbout.style.display = 'block';
});