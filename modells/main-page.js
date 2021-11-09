const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainPageSchema = new Schema({
    about: {type: String},
    brief: {type: String}
})
module.exports = mongoose.model('MainPage', mainPageSchema);