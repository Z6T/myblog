const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/zetablog', { useNewUrlParser: true }, (err) => {
    if (err) console.log(err)
    console.log('connecting is success')
})

const userSchema = new Schema({
    uname: {
        type: String,
        required: true
    },
    psd: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)