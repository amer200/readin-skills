const myFormBrief = document.getElementById('myFormBrief');
const subBtnBrief = document.getElementById('subBtnBrief');
const myFormAbout = document.getElementById('myFormAbout');
const subBtnAbout = document.getElementById('subBtnAbout');
const brief = document.getElementById('brief');
const briefContent = document.getElementById('briefcontent');
const aboutContent = document.getElementById('aboutcontent');
const about = document.getElementById('about');
const editor = document.getElementById('editor');
const blogBtn = document.getElementById('mix');
const blogList = document.getElementById('blogs');
const removeBlogBtn = document.getElementById('removeBlogBtn');
const removeBlogForm = document.getElementById('removeBlogForm');
const addBlog = document.getElementById('addBlog');
const blogForm = document.getElementById('blogForm');
const subBtnBlog = document.getElementById('subBtnBlog');
const blogContent = document.getElementById('content');
const student = document.getElementById('student');
const users = document.getElementById('users');
const rmForm = document.getElementsByClassName('rm-form');
const rmBtn = document.getElementsByClassName('rm-btn');
brief.addEventListener('click', () => {
    myFormBrief.action = '/admin/brief';
    myFormBrief.style.display = 'block';
    myFormAbout.style.display = 'none';
    blogList.style.display = 'none';
    blogForm.style.display = 'none';
    users.style.display = 'none';
});

subBtnBrief.addEventListener('click', () => {
    briefContent.value = quill.root.innerHTML;
    myFormBrief.submit();
});

about.addEventListener('click', () => {
    myFormAbout.action = '/admin/about';
    myFormBrief.style.display = 'none';
    myFormAbout.style.display = 'block';
    blogList.style.display = 'none';
    blogForm.style.display = 'none';
    users.style.display = 'none';

});
subBtnAbout.addEventListener('click', () => {
    aboutContent.value = quill2.root.innerHTML;
    myFormAbout.submit();
});
blogBtn.addEventListener('click', () => {
    blogList.style.display = 'block';
    myFormBrief.style.display = 'none';
    myFormAbout.style.display = 'none';
    blogForm.style.display = 'none';
    users.style.display = 'none';
})
student.addEventListener('click', () => {
    blogList.style.display = 'none';
    myFormBrief.style.display = 'none';
    myFormAbout.style.display = 'none';
    blogForm.style.display = 'none';
    users.style.display = 'block';
})
if (removeBlogBtn) {
    removeBlogBtn.addEventListener('click', () => {
        if (confirm('سوف يتم حذف المقالة نهائيا هل انت متأكد ؟')) {
            removeBlogForm.submit()
        }
    })
}
addBlog.addEventListener('click', () => {
    blogForm.style.display = 'block';
    blogList.style.display = 'none';
    myFormBrief.style.display = 'none';
    myFormAbout.style.display = 'none';
    users.style.display = 'none';
})
subBtnBlog.addEventListener('click', () => {
    content.value = quillBlog.root.innerHTML;
    blogForm.submit();
})
Object.values(rmForm).forEach(f => {
    f.addEventListener('click', ()=>{
        if(confirm('سيتم حذف الطالب نهائيا')){
            f.submit();
        }
    })
})