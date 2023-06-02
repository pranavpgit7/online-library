const mongoose = require('mongoose');

//schema essentially another word or term for a table, database table **
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

//first of all, creating a new model, also in here Author represents the table name, and authorSchema defines that table
module.exports = mongoose.model('Author', authorSchema);