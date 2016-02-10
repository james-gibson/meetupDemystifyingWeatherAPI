(function location(){
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude);

        queryForecast(position.coords.latitude,position.coords.longitude);
    });
})();

function queryForecast(latitude,longitude) {

    var apiUrl = 'http://localhost:3000/forecast?latitude=' + latitude + '&longitude=' + longitude;

    httpGet(apiUrl, updateUI);


    function updateUI(weatherData) {
        if(weatherData.error){
            console.log(weatherData.message);
            return;
        }
        console.log(weatherData);
        var current = weatherData['currently'];
        var currentTemp = current.temperature;
        var currentHumidity = current.humidity;
        var currentDescription = current.summary;

        $('.temperature.current').html(currentTemp);
        $('.colloquial.current').html(currentDescription);
        $('.humidity.current').html(currentHumidity);
    }

    function httpGet(url, callback)
    {
        console.log(url);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(JSON.parse(xmlHttp.responseText));
        }
        xmlHttp.open("GET", url, true); // true for asynchronous
        xmlHttp.send(null);
    }
}