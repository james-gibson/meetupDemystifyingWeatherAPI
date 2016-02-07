var express = require('express');
var Forecast = require('forecast.io');

var options = {
    APIKey: 'f9432de5768255133e4634114d18a1c9',
    timeout: 1000
};
var forecast = new Forecast(options);

function getForecast(req, res) {
    var latitude = req.query.lat || req.query.latitude;
    var longitude = req.query.lon || req.query.longitude;
    var time = req.query.time || new Date();

    if(!latitude || !longitude) {
        res.status = 400;
        res.send('Invalid query parameters');
        return;
    }

    var p = queryForecast(latitude, longitude);

    p.then(function(forecastResult) {
        res.send(forecastResult);
    })
};

function queryForecast(latitude, longitude) {
    var promise = new Promise(function(resolve,reject){
        forecast.get(latitude, longitude, function (err, res, data) {
            if (err) {
                reject(err);
            };

            resolve(data);
        });
    });


    return promise;
}

module.exports = getForecast;