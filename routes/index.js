//import express again as it is used throughout the whole application
const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('index');
});

module.exports = router;