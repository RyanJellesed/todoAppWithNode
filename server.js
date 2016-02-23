var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

var lionRouter = require('./routes/lions');

var Lion = require('./models/lions');

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// router.use(function(req, res, next) { // middleware to 'use' for all requests
//     console.log('Hell Yeah ' + port);
//     next(); // make sure we go to the next routes and don't stop here
// });


// app.get('/', function(req, res){
//     res.render('index', {title: 'whats up!'});
// });

app.use('/api', lionRouter);

app.listen(port);
console.log('There server is on PORT ' + port);

