const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    quiz: {
        type: String
    },
    rightanswer: {
        type: String
    },
    wrongAnswerone: {
        type: String
    },
    wrongAnswertwo: {
        type: String
    }
});
const paragraphSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    plaintext: {
        type: String,
        required: true
    },
    wordcount: {
        type: String
    },
    so: {
        type: Number,
        unique: false
    },
    hide: {
        type: Boolean,
        default: false
    },
    quizs: [quizSchema]
})
module.exports = mongoose.model('Paragraph', paragraphSchema);