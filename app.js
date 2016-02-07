var express = require('express');
var weatherData = require('./weatherData.js');
var port = 3000;

var app = express();

app.use(express.static('public'));

app.use('/forecast', weatherData);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(port, function () {
    console.log('Personal Forecast app listening on port ' + port);
});