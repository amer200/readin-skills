const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defString = 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة';
const mainPageSchema = new Schema({
    about: {
        type: String,
    },
    brief: {
        type: String
    }
})
module.exports = mongoose.model('MainPage', mainPageSchema);