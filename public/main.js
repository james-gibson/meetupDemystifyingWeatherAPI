(function location(){
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude);

        queryForecast(position.coords.latitude,position.coords.longitude);
    });
})();

function queryForecast(latitude,longitude) {
}