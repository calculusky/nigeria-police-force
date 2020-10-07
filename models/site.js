const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = new Schema({
    state: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const site = mongoose.model('Site', siteSchema);
module.exports = site;