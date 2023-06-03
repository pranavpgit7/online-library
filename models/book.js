const mongoose = require('mongoose');
const coverImageBasePath = 'uploads/bookCovers';

//schema essentially another word or term for a table, database table **
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount:{
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }
});

//first of all, creating a new model, also in here Author represents the table name, and authorSchema defines that table
module.exports = mongoose.model('Book', bookSchema);
module.exports.coverImageBasePath = coverImageBasePath; //exporting in the name as coverImageBasePath, unlike default ways