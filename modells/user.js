const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    name: {type: String},
    grade: {type: String},
    speed: {type: String}
})
const userSchema = new Schema({
    name: {type: String},
    password: {type: String},
    role: {type: String},
    test: [gradeSchema]
})

module.exports = mongoose.model('User', userSchema);
