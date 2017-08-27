var express = require('express'),
    mongoose = require('mongoose'),
    borderParser = require('body-parser');

var db;

if(process.env.ENV == 'test') {
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
}else {
    db = mongoose.connect('mongodb://localhost/bookAPI');
}

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(borderParser.urlencoded({extended: true}));
app.use(borderParser.json());

bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
    res.send('Welcome to my API');
});

app.listen(port, function(){
    console.log('Gulp is running on PORT ' + port);
});

module.exports = app;