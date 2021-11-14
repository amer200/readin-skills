const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const createDomPuirfy = require('dompurify');
const {
    JSDOM
} = require('jsdom');
const {
    marked
} = require('marked');
const blogSchema = new Schema({
    title: {
        type: String
    },
    img: {
        type: String
    },
    content: {
        type: String //html content
    },
    text: {
        type: String // only text with out html tag
    }
})
module.exports = mongoose.model('Blog', blogSchema);