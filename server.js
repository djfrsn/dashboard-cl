var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var port = process.env.PORT || 3090;
var router = express.Router(); // eslint-disable-line new-cap
var path = require('path');

app.use(express.static(path.join(__dirname, '/target'))); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser());  // pull information from html in POST
app.use(methodOverride()); // simulate DELETE and PUT

router.get('/', function(req, res) {
  res.render('index.html');
});

app.use('/', router);

app.listen(port);
console.log('App running on port', port); // eslint-disable-line no-console
