//if we are running in either production environment or development environment checking..
if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}

const express = require('express');
//express application
const app = express();

//using express layouts for setting layout for all of the html used
const expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

/*--------------end of importing or requiring modules------------------------------- */

//setting routes folders (relative path)
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');

//set view engine as ejs
app.set('view engine', 'ejs');

//set where these views are coming from, which is from the views folder
app.set('views', __dirname + '/views');

//idea behind this is to use minimize duplication of html, especially the headers and footers
app.set('layout', 'layouts/layout');

//using the imported express-ejs-layout, using it as middleware
app.use(expressLayouts);

//setting the folder Public for all the static files such as styles, images etc..
app.use(express.static('public'));

//using urlencoded because we are sending the body via url, also increasing the limit size the server can accept to 10 mega-bytes, becomes useful when you begin to uplaod files to the server..
app.use(bodyParser.urlencoded({ 
    limit : '10mb', 
    extended : false}));

//using routes for index path
app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser : true
});

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', ()=> console.log("Connected to Mongoose"));


//to pull values from environment variable set, "process.env.PORT" is used for..
app.listen(process.env.PORT || 3000);
