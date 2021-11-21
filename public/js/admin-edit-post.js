const subBtnBlog = document.getElementById('subBtnBlog');
const blogForm = document.getElementById('blogForm');
const blogContent = document.getElementById('content');
subBtnBlog.addEventListener('click', () => {
    content.value = quill.root.innerHTML;
    blogForm.submit();
})