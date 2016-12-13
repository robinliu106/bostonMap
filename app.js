var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
//mongostuff
var Db = require('mongodb').Db,
         Server = require('mongodb').Server;

var index = require('./routes/index');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;





//Get data from MongoDB
var schools = [];
var school_coords = [];

var hospitals = [];
var hospital_coords = [];

var crimes = [];
var crime_coords = [];

var neighborhood_scores = [];

var db = new Db('repo', new Server('localhost', 27017));
db.open(function(err, db) {

    if (err) { console.log ('Error message : ' + error); }

    db.collection('jyaang_robinliu106.school').find().toArray( function(err,result) {

        if (err) { console.log ('Error message : ' + error); }

        for (var i = 0; i < result.length; i++) {
            //schools has [schoolName, coords]
            schools.push( [ result[i]['schoolName'] , result[i]['coord'] ]);
            //coords is just [ coords ]
            school_coords.push( result[i]['coord']);
        }
    });

    db.collection('jyaang_robinliu106.hospital').find().toArray( function(err,result) {

        if (err) { console.log ('Error message : ' + error); }

        for (var i = 0; i < result.length; i++) {
            hospitals.push( [ result[i]['hospitalName'] , result[i]['coord'] ]);
            hospital_coords.push( result[i]['coord']);
        }
    });

    db.collection('jyaang_robinliu106.crime').find().toArray( function(err,result) {

        if (err) { console.log ('Error message : ' + error); }

        for (var i = 0; i < result.length; i++) {
            crimes.push( [ result[i]['crimeName'] , result[i]['coord'] ]);
            crime_coords.push( result[i]['coord']);
        }
    });

    db.collection('jyaang_robinliu106.neighborhood_scores').find().toArray( function(err,result) {

        if (err) { console.log ('Error message : ' + error); }

        for (var i = 0; i < result.length; i++) {
            neighborhood_scores.push( [ result[i]['neighborhood'] , result[i]['score'] ]);
        }
    });


});

var close = db.close();

app.get('/', function(req,res) {
    return res.render({'test':schools});
});


var port = 8000;
var listening = app.listen(port);

if (listening) {
    console.log('\n App is now running on port: ' + port);
}
