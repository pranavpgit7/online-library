//import express again as it is used throughout the whole application
const express = require('express');
const router = express.Router();

//requiring that author model that we created inside models folder
const multer = require('multer');
const path = require('path');

const Book = require('../models/book');
const Author = require('../models/author');

const uploadPath = path.join('public', Book.coverImageBasePath);
const imageMimeTypes = ['images/jpeg','images/png','images/gif'];


const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
});

//All books route
router.get('/', (req,res)=>{
    res.send("All Books");
});

//New book route
router.get('/new', async (req,res)=>{
    try{
        const authors = await Author.find({});
        const book = new Book();
        res.render('books/new', { authors : authors, book : book });
    }catch{
        res.redirect('/books')
    }
})

//Create book route
router.post('/', async (req,res)=>{
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description
    })
});

module.exports = router;