const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ruleSchema = new Schema({
    read: {
        type: Array
    },
    light: {
        type: Array
    }
})
module.exports = mongoose.model('Rule', ruleSchema);