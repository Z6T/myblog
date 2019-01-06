const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const typeSchema = new Schema({
    typetext: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('type', typeSchema)