var weather = require('weather-js'); //I installed the weather.js npm and this assigns the variable weather to the module. 

forecast = [] //Set up an empty array assigned to forecast.

weather.find({search: 'St. John"s, NL', degreeType: 'C'}, function(err, result) { //Retrieve the current weather from weather.js for St. John's.
    if(err) console.log(err); //If there is an error it will log it to the terminal.
    forecast = JSON.stringify(result, null, 2) //Stringify the results and add the results array to forecast.
  });


module.exports = {  //Exports the forecast array so it is available for import elsewhere. In this case they are imported and used in index.js. 
    forecast
}

