const modalBtn = document.getElementById('modalBtn');
const modal = document.getElementById('modal');
const page = document.getElementById('page');

modalBtn.addEventListener('click', () => {
    modal.classList = 'd-none';
    page.classList = 'page';
})