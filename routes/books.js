//import express again as it is used throughout the whole application
const express = require('express');
const router = express.Router();

//requiring that author model that we created inside models folder
const Author = require('../models/author');

//All authors route
router.get('/', async (req,res)=>{
    let searchOptions = {};

    //using req.query instead of req.body because it is using get method**
    if(req.query.name != null && req.query.name !== '')
    {
        searchOptions.name = new RegExp(req.query.name, 'i'); //here i means case insensitive, regExpr is used for auto-completion while checking or searching authors, because that is how it works
    }

    try{
        const authors = await Author.find(searchOptions);
        res.render('authors/index', { authors : authors, searchOptions : req.query });
    }catch{
        res.redirect('/');
    }
    
});

//New authors route
router.get('/new', (req,res)=>{
    res.render('authors/new', { author : new Author()});
});

//Create author route
router.post('/', async (req,res)=>{

    const author = new Author({
        name : req.body.name
    });

    try{
        const newAuthor = await author.save();
        //         // res.redirect(`authors/${newAuthor.id}`)
            res.redirect('authors')
    }catch{
        res.render('authors/new', {author : author, errorMessage : "Error Creating Author"})
    }

    /*----------------------- the below code doesnt seem to work----------------------------- */
    // author.save((error, newAuthor)=>{
    //     if(error)
    //     {
    //         res.render('authors/new', { author : author, errorMessage : "Error creating author" });
    //     }else{
    //         // res.redirect(`authors/${newAuthor.id}`)
    //         res.redirect(`authors`)
    //     }
    // })
});

module.exports = router;