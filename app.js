var express = require('express'),
    bson = require('bson'),
    path = require('path'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'), //used to manipulate POST, DELETE, etc
    
    attractions = require('./routes/attractions'),
    users = require('./routes/users'),
    home = require('./routes/home'),
    
    db = require('./models/db');
    
var app = express();

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({    // to support URL-encoded bodies
  extended: true
}));
app.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}));

app.set('views', __dirname + '/views');

app.use(morgan('tiny'));	// Log requests

// Define the view (templating) engine.
app.set('view engine', 'jade');

// Define that static content such as html is in public directory
app.use(express.static(__dirname + '/public'));


/* 
	## Example of how to build crud operations with express app ##
	   The operations are defined in dbRoutes.js which links to the model. */

// ROUTES
app.use('/attractions', attractions)
app.use('/users', users)
app.use('/', home)

// specified port for running app
app.listen(50000);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
