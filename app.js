/**
 * Testing the OpenWeathermap API
 */

//Require modules we use
const express = require( "express" );
const https = require( "https" );
const bodyParser = require( "body-parser" ); 

//Used and Useful constants
const API_PORT = 3000;  //server port
const apiKey = `1410bd7229098d1b2146ecebbe7e6b6f`;
const units = "metric";

//app to use
const app = express();
app.use( bodyParser.urlencoded( { extended:true } ) );  //parse the POST request

//GET requests
app.get( "/", ( req, res ) => {
    res.sendFile( `${__dirname}/index.html` );
} );

//POST requests
app.post( "/", (req, res) => {
    const queryCity = req.body.cityName;    //parsing the cityName that the user types
    const testURL = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${apiKey}&lang=en&units=${units}`;
    //Making GET request to an external server natively using HTTPS module
    https.get( testURL, ( response ) => {
        response.on( "data", ( data ) => {  //GET the response on "data" event and log the data
            const weatherData = JSON.parse( data );    //parse the data to an actual JS object and log it
            console.log( weatherData );

            //Print the weather temperature, description and the img linked to it
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            res.send( "<h1>The temperature in " + queryCity + " is " + temperature + " °C </h1>" +
                      "<p>The weather is currently " + description + " and there's an image : </p> <br />" +
                      "<img src=" + iconURL + ">" );
        } );    
    } );
} )


//Spin up the server 
app.listen( API_PORT, () => {
    console.log( `Server running on port ${ API_PORT }...\n` ); 
} ); 