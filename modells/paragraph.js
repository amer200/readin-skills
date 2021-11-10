const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createDomPuirfy = require('dompurify');
const {
    JSDOM
} = require('jsdom');
const {
    marked
} = require('marked');
const dompurify = createDomPuirfy(new JSDOM().window)
const paragraphSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    contentHtml: {
        type: String,
        required: true
    }
})
paragraphSchema.pre('validate', function(next){
        if (this.content) {
            this.contentHtml = dompurify.sanitize(marked(this.content));
        }
        next()
})
module.exports = mongoose.model('Paragraph', paragraphSchema);