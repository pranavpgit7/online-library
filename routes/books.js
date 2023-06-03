//import express again as it is used throughout the whole application
const express = require('express');
const router = express.Router();

//requiring that author model that we created inside models folder
const multer = require('multer');
const path = require('path');

const Book = require('../models/book');
const Author = require('../models/author');

const uploadPath = path.join('public', Book.coverImageBasePath);
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];


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
router.get('/new', (req,res)=>{
    renderNewPage(res, new Book()) //here error is not passsing because in new page there is going to be no errors
})

//Create book route
router.post('/', upload.single('cover'), async (req,res)=>{
    const filename = req.file != null ? req.file.filename : null
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        coverImageName: filename,
        description: req.body.description
    })

    try{
        const newBook = await book.save();
        // res.redirect(`books/${newBook.id}`);
        res.redirect('books');
    }catch{
        renderNewPage(res, new Book(), true); //error is being passed  
    }
});

async function renderNewPage(res, book, hasError = false){
    try{
        const authors = await Author.find({});
        // const params = {
        //     authors : authors, 
        //     book : book 
        // }

        if(hasError)
        {
            params.errorMessage = 'Error Creating Book';
        }

        res.render('books/new', { book, authors }); //error fixed
        // res.render('books/_form_fields', { book: book });

    }catch{
        res.redirect('/books')
    }
}

module.exports = router;