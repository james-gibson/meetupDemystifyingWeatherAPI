# Demystifying A Weather API

Ever wanted to build something that used someone else's data? Well many websites actually make their data available through Application Programming Interfaces or API's for short, sometimes for free!

During this meetup I'd like to introduce you to a few tips and tricks on how to gain access to API's for your own projects. We will be utilizing a popular weather forecast site to request an API key, using that key to interact with the API, and then stepping through some javascript to see the data in action.

#### Prerequsites

This guide assumes that you have Node.js installed on your computer, if you do not have it installed or have no idea what Node.js is check out this [tutorial](https://html5hive.org/complete-beginners-guide-to-node-js/)


#### Getting started

These days weather data seems to be everywhere, and in some regards it is everywhere.  I have chosen to introduce weather api's to you by focusing on a fairly unique product in the weather data market, Forecast.io.  This weather site aggrigates through statistics multiple weather sources to provide hyper-local forecasts based on your location.

![forecast.io](./images/forecastIO.jpg)

Have no fear, the service that they provide is actually free for low volume users like ourselves!

I'd like to walk you through obtaining an API key, making a call to the API, explaining a few pitfalls to avoid, as well as building a simple web page that will communicate with a simple web server to deliver personalized weather information.  The idea is that you will be able to change anything to your liking after the meetup :-)


#### Obtaining an API key

Many sites advertise their API's in the site footer, usually they mention API or Developer as part of the link.  If we scroll to the bottom of forecast.io we will see the following:
![forecast.io api link](./images/apiLink.jpg)

Go ahead and click on it, we will be taken to the developer portal for forecast.io.

![forecast.io developer portal](./images/developerSection.jpg)

Click register and fill in your information

![forecast.io developer portal registration](./images/register.jpg)


Once logged in you will have access to the API key.


#### Doing something with the key
Once logged in you will see something similar to this:
![forecast.io developer portal](./images/portal.jpg)

If you click on the example link a weather forecast will open.  It will be a large JSON object, one that we will have to parse later.

Go ahead and open your browser (I am using chrome), and in a new tab open the JS console; In chrome this is under the developer tools.

Paste this function into the console and press enter:

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

Chrome will print `undefined` onto the console, this is fine.

Next enter the following into your console, remembering to replace the `<apiKey>` place holder with your api key, then press enter.

    httpGet('https://api.forecast.io/forecast/<apiKey>/37.8267,-122.423', function(result) { 
        console.log(result);
    });
    
Now this will respond with an error, chrome reports the error as:

    Fetch API cannot load https://api.forecast.io/forecast/<apiKey>/37.8267,-122.423. 
    No 'Access-Control-Allow-Origin' header is present on the requested resource. 
    Origin 'https://www.google.com' is therefore not allowed access. 
    If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
    
####Don't Panic.

This error is actually the browser protecting you as the user from what is known as Cross Site Scripting or [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) for short.

To work around this we will actually utilize Node.js to set up a simple web server that will query forecast.io for the forecast and then send the data to a page we design.