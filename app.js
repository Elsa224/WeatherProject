/**
 * Testing the OpenWeathermap API
 */

//Require modules we use
const express = require( "express" );
const https = require( "https" );
const API_PORT = 3000;  //server port
const app = express();

//GET requests
app.get( "/", ( req, res ) => {
    const testURL = "https://api.openweathermap.org/data/2.5/weather?q=Abidjan&appid=1410bd7229098d1b2146ecebbe7e6b6f&lang=en&units=metric";
    //Making GET request to an external server natively using HTTPS module
    https.get( testURL, ( response ) => {
        response.on( "data", ( data ) => {  //GET the response on "data" event and log the data
            const weatherData = JSON.parse( data );    //parse the data to an actual JS object and log it
            console.log( weatherData );

            //Print the weather temperature, description and the img linked to it
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const nameCity = weatherData.name;
            const icon = weatherData.weather[0].icon;
            const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            res.send( `<h1>The temperature in ${ nameCity } is ${ temperature } °C </h1>` 
                      `<p>The weather is currently "${ description }" and there's an image : </p> <br />`
                      `<img src="${iconURL}"> `);
        } );    
    } );
} );

//Spin up the server 
app.listen( API_PORT, () => {
    console.log( `Server running on port ${ API_PORT }...\n` ); 
} ); 