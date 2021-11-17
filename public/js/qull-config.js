  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    ['image'],
    [{
      'header': 1
    }, {
      'header': 2
    }], // custom button values
    [{
      'list': 'ordered'
    }, {
      'list': 'bullet'
    }],
    [{
      'script': 'sub'
    }, {
      'script': 'super'
    }], // superscript/subscript
    [{
      'indent': '-1'
    }, {
      'indent': '+1'
    }], // outdent/indent
    [{
      'direction': 'rtl'
    }], // text direction

    [{
      'size': ['small', false, 'large', 'huge']
    }], // custom dropdown
    [{
      'header': [1, 2, 3, 4, 5, 6, false]
    }],

    [{
      'color': []
    }],
    [{
      'align': []
    }],

    ['clean'] // remove formatting button
  ];
  var quill = new Quill('#editor', {
    modules: {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler
        },
      },
      imageResize: {
        displaySize: true
    }
    },
    theme: 'snow'
  });
  function imageHandler() {
    var range = this.quill.getSelection();
    var value = prompt('ادخل رابط الصورة');
    if (value) {
      this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
    }
  }