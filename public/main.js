(function location(){
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude);

        queryForecast(position.coords.latitude,position.coords.longitude);
    });
})();

function queryForecast(latitude,longitude) {
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