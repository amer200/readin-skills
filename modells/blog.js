const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
})
module.exports = mongoose.model('Blog', blogSchema);