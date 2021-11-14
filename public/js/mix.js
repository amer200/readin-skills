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
    }],
    ['image']
];
// Quill configuration
var options = {
    theme: 'snow',
    modules: {
        toolbar: {
            container: toolbarOptions,
            handlers: {
                image: imageHandler,
            }
        },
        imageResize: {
            displaySize: true
        }
    }
};

function imageHandler() {
    var range = this.quill.getSelection();
    var value = prompt('ادخل رابط الصورة');
    if (value) {
        this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
    }
}


// The quill instance
var editor = new Quill('#editor', options);
document.getElementById('submitBtn').addEventListener('click', () => {
    document.getElementById('hiddenContent').value = editor.root.innerHTML;
    document.getElementById('textContent').value = editor.getText();
    document.getElementById('addForm').submit();
})