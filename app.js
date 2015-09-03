var express = require("express");
var morgan = require("morgan");
// to be used later once mongodb functionality is added
//var dbRoutes = require('./routes/dbRoutes'); 
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({    // to support URL-encoded bodies
  extended: true
})); 

app.set('views', __dirname + '/views');

app.use(morgan('tiny'));	// Log requests

// Define the view (templating) engine. Similar to erb.
app.set('view engine', 'ejs');

// Define that static content such as html is in public directory
app.use(express.static(__dirname + '/public'));


/* 
	## Example of how to build crud operations with express app ##
	   The get operations are defined in dbRoutes.js which links to the model.

app.get('/:collection/:firstname?/:lastname?', dbRoutes.getArtist);
app.post('/:collection/:firstname/:lastname', dbRoutes.postArtist);
app.put('/:collection/:firstname/:lastname/:band/:genre', dbRoutes.putArtist);
app.delete('/:collection/:firstname/:lastname', dbRoutes.deleteArtist);

*/

// specified port for running app
app.listen(50000);


console.log("Server listening at http://localhost:50000/");
