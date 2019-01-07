const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const ArticleSchema = new Schema({
    a_title: {
        type: String,
        required: true
    },
    a_desc: {
        type: String,
        required: true
    },
    a_content: {
        type: String,
        required: true
    },
    a_pubdate: {
        type: String,
        required: true
    },
    a_zhuanti: {
        type: String
    },
    a_tags: {
        type: Array,
        required: true
    },
    a_type: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('article', ArticleSchema)