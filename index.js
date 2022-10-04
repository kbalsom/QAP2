//Written by: Kara Balsom
//Date Written: September 29, 2022
//File Name: index.js

//This page sets up the router for the application, as well as uses some listeners/events.

const http = require('http'); //Imports the global http module, and assigns it to the constant http.
// const fs = require('fs'); //Imports the global fs (filesystem) module, and assigns it to the constant fs.
const EventEmitter = require('events');  //Imports the global events module, and assigns it to the constant EventEmiter.
class MyEmitter extends EventEmitter {}; //Creates a class MyEmitter, that inherits the properties of EventEmiiter.
const myEmitter = new MyEmitter(); //Assigns the constant myEmitter to a new instance of the MyEmitter class.
// const path = require("path") //Imports the path module and assigns it to the constant path.
const routes = require('./routes.js'); //Imports the routes.js file, and assigns it to the constant routes. This allows any modules exported there to be used here. 
const logger = require('./logger.js'); //Imports the logger.js file, and assigns it to the constant logger. This allows any modules exported there to be used here. 
const weather = require('./weather.js'); //Imports the weather.js file, and assigns it to the constant weather. This allows any modules exported there to be used here. 


//A listener is added, which listens for events called "status", which has a parameter of "msg". When the event is invoked, the listener will log the "msg" to the console, and passes the "msg"  to the append function in logger.js. That function will append the "msg" to the specified file. 
myEmitter.addListener('status', (msg) => {
    console.log(msg)
    logger.append(msg)
});

//A listener is added, which listens for events called "route", which has a parameter of "msg". When the event is invoked, the listener will log the "msg" to the console, and passes the "msg"  to the append function in logger.js. That function will append the "msg" to the specified file. 
myEmitter.addListener('route', (msg) => {
    console.log(msg);
    logger.append(msg)
});

// Sets up the server using the http.createServer module, and assigns it the constant server. It takes in the parameters "req" (request), and "res" (response). 
const server = http.createServer((req, res) => {
    let path = "./views/";//Assigns the variable path the string "./views", in reference to the views file in which all the HTML files are contained.
    logger.fileOps() //Calls the fileOps function in logger.js, which creates a new directory, whose name is the current month and year, and/or a new file, whose name is the current month, date, and year. This function only creates the directory and/or file if they don't already exist.
    console.log(`Request from: ${req.url}`) //Logs the url sending the request to the terminal.
    switch(req.url) { //Creates a switch statement that takes in the name of the url making the request as a parameter. It will execute the block of code corresponding to the route that the request came from. 
        case '/': //If the request is coming from the "/" url, it executes the follow code:
            path += "index.html"; //Path is already assigned "./views", and this concatenates "/index.html" on to it, so the full path is sent to the routes page function indexPage below. 
            myEmitter.emit('route', `Route Accessed: ${req.url}`) //This invokes a "route" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Route Accessed:" and the request url that was set in the above. 
            res.statusCode = 200; //Sets the response Status Code to 200, meaning OK.
            myEmitter.emit('status', `Status Code: ${res.statusCode}`)  //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above. 
            routes.indexPage(path, res); //This invokes the function indexPage in routes.js. It send the path and the res (response), as parameters to that function. 
            console.log(`Request from ${req.url} responded to.`) //This logs the string and the req.url to the terminal.
            break; //breaks out of the switch block, returns to top waiting for a new request.
        case '/about': //If the request is coming from the "/about" url, it executes the follow code:
            path += "about.html"; //Path is already assigned "./views", and this concatenates "/about.html" on to it, so the full path is sent to the routes page function aboutPage below. 
            myEmitter.emit('route', `Route Accessed: ${req.url}`) //This invokes a "route" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Route Accessed:" and the request url that was set in the above. 
            res.statusCode = 200; //Sets the response Status Code to 200, meaning OK.
            myEmitter.emit('status', `Status Code: ${res.statusCode}`) //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above. 
            routes.aboutPage(path, res); //This invokes the function aboutPage in routes.js. It send the path and the res (response), as parameters to that function. 
            console.log(`Request from ${req.url} responded to.`) //This logs the string and the req.url to the terminal.
            break; //breaks out of the switch block, returns to top waiting for a new request.
        case '/contactus': //If the request is coming from the "/contactus" url, it executes the follow code:
            path += "contactus.html"; //Path is already assigned "./views", and this concatenates "/index.html" on to it, so the full path is sent to the routes page function contactUsPage below. 
            myEmitter.emit('route', `Route Accessed: ${req.url}`) //This invokes a "route" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Route Accessed:" and the request url that was set in the above. 
            res.statusCode = 200; //Sets the response Status Code to 200, meaning OK.
            myEmitter.emit('status', `Status Code: ${res.statusCode}`) //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above. 
            routes.contactUsPage(path, res); //This invokes the function contactUsPage in routes.js. It send the path and the res (response), as parameters to that function. 
            console.log(`Request from ${req.url} responded to.`) //This logs the string and the req.url to the terminal.
            break; //breaks out of the switch block, returns to top waiting for a new request.
        case '/weather': //If the request is coming from the "/weather" url, it executes the follow code:
            path += "weather.html"; //Path is already assigned "./views", and this concatenates "/weather.html" on to it, so the full path is sent to the routes page function weatherPage below. 
            myEmitter.emit('route', `Route Accessed: ${req.url}`) //This invokes a "route" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Route Accessed:" and the request url that was set in the above. 
            res.statusCode = 200; //Sets the response Status Code to 200, meaning OK.
            myEmitter.emit('status', `Status Code: ${res.statusCode}`) //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
            routes.weatherPage(path, res);  //This invokes the function weatherPage in routes.js. It send the path and the res (response), as parameters to that function. 
            res.write(`Weather Page: ${forecast}`, 'utf8', () => {
                console.log("Displaying Weather.");
            }); //This uses res.write to overwrite any html code in /weather.html. It instead display the string "Weather Page: " and the forecast array found in weather.js. It also logs the string "Displaying Weather." to the terminal.
            res.end() // This ends the response. 
            console.log(`Request from ${req.url} responded to.`) //This logs the string and the req.url to the terminal.
            break; //breaks out of the switch block, returns to top waiting for a new request.
        case '/contact': //If the request is coming from the "/contact" url, it executes the follow code:
            path += "contact.html";  //Path is already assigned "./views", and this concatenates "/contact.html" on to it, so the full path is sent to the routes page function weatherPage below. 
            myEmitter.emit('route', `Route Accessed: ${req.url}`) //This invokes a "route" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Route Accessed:" and the request url that was set in the above. 
            res.statusCode = 300; //Sets the response Status Code to 300 - Multiple Choices, which indicates that the request has more than one possible responses. In this case, the user requested the /contact url, and I just made the HTML respond with a list of two possible choices, the contact us page and the subscription page. 
            myEmitter.emit('status', `Status Code: ${res.statusCode}, ${req.url}`) //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
            routes.contactPage(path, res); //This invokes the function ContactPage in routes.js. It send the path and the res (response), as parameters to that function. 
            console.log(`Request from ${req.url} Resulted in Multiple Choices. List Presented.`) //This logs the message to the terminal, including the request url.
            break; //breaks out of the switch block, returns to top waiting for a new request.
        case '/subscribe': //If the request is coming from the "/subscribe" url, it executes the follow code:
            path += "subscribe.html" //Path is already assigned "./views", and this concatenates "/subscribe.html" on to it, so the full path is sent to the routes page function subscribePage below. 
            myEmitter.emit('route', `Route Accessed: ${req.url}`) //This invokes a "route" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Route Accessed:" and the request url that was set in the above. 
            res.setHeader('Set-cookie', 'subscription=New'); //The header gives data to the server. Here the header is set using two parameters: the type of data (cookie), and the value of that data (new subscription).
            routes.subscribePage(path, res); //This invokes the function subscribePage in routes.js. It send the path and the res (response), as parameters to that function. 
            console.log(`Request from ${req.url} responded to.`) //This logs the message to the terminal, including the request url.
            break; //breaks out of the switch block, returns to top waiting for a new request.
        case '/about-me': //If the request is coming from the "/about-me" url, it executes the follow code:
            res.statusCode = 301; //Sets the response Status Code to 301 - Moved Permanently. This means the url is no longer in use, and the information it used to contain has been moved to a different url. It will need to redirect. 
            myEmitter.emit('route', `Route Accessed: ${req.url}`)  //This invokes a "route" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Route Accessed:" and the request url that was set in the above. 
            myEmitter.emit('status', `Status Code: ${res.statusCode}`) //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
            res.setHeader('Location', '/about'); //This is where the redirect happens. The header takes the parameters type of data (location), and the value of the data (the location of the redirect, in this case /about). Now when a repsonse is received from /about-me, the user will be redirected to /about. The /about code block will be invoked. 
            res.end(); //Response is ended.
            break; //breaks out of the switch block, returns to top waiting for a new request.
        case '/forbidden': //If the request is coming from the "/forbidden" url, it executes the follow code:
            path += "forbidden.html"; //Path is already assigned "./views", and this concatenates "/forbidden.html" on to it, so the full path is sent to the routes page function forbiddenPage below. 
            myEmitter.emit('route', `Route Accessed: ${req.url}`)  //This invokes a "route" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Route Accessed:" and the request url that was set in the above. 
            res.statusCode = 403; //Sets the response Status Code to 403 - Access Forbidden. This means the user lacks the credentials to access this page. I have just made the html display the message, as setting up user credential inputs was beyond the scope of this project. 
            myEmitter.emit('status', `Status Code: ${res.statusCode}`) //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
            routes.forbiddenPage(req.url, path, res); //This invokes the function forbiddenPage in routes.js. It send the req.url, path and the res (response), as parameters to that function. 
            console.log(`Request from ${req.url} Responded to with 403 Error - Access Forbidden.`) //This logs the message to the terminal, including the request url.
            break; //breaks out of the switch block, returns to top waiting for a new request.
        case '/ghost': //If the request is coming from the "/ghost" url, it executes the follow code:
            path += "ghost.html"; //Path is already assigned "./views", and this concatenates "/ghost.html" on to it, so the full path is sent to the routes page function ghostPage below. 
            myEmitter.emit('route', `Route Accessed: ${req.url}`) //This invokes a "route" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Route Accessed:" and the request url that was set in the above. 
            res.statusCode = 410; //Sets the response Status Code to 410 - Page has been Permanently Deleted. This error means the page has been permanently removed from the server. 
            myEmitter.emit('status', `Status Code: ${res.statusCode}`) //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
            routes.ghostPage(req.url, path, res); //This invokes the function ghostPage in routes.js. It send the req.url, path and the res (response), as parameters to that function. 
            console.log(`Request from ${req.url}, Page Has Been Permanently Deleted.`) //This logs the message to the terminal, including the request url.
            break; //breaks out of the switch block, returns to top waiting for a new request.
        default: //Default is different than case, in that if none of the cases are a match this block of code is executed by default. It is set up as an error 404 - Page Not Found.
            path += "notfound.html"; //Path is already assigned "./views", and this concatenates "/noutfound.html" on to it, so the full path is sent to the routes page function notFoundPage below. 
            myEmitter.emit('route', `Route Accessed: ${req.url}`) //This invokes a "route" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Route Accessed:" and the request url that was set in the above. 
            res.statusCode = 404; //Sets the response Status Code to 404 - Page not Found. This means that the url in which the request came from does not match any of the urls on the server. 
            myEmitter.emit('status', `Status Code: ${res.statusCode}`) //This invokes a "status" event, which will cause the listener above to execute it's code. The second parameter is the msg that is sent to the listener. In this case the msg is "Status Code:" and the status code that was set in the line above.
            routes.notFoundPage(req.url, path, res); //This invokes the function ghostPage in routes.js. It send the req.url, path and the res (response), as parameters to that function. 
            console.log(`Request from ${req.url} Responded to with 404 Error - Page Not Found.`) //This logs the message to the terminal, including the request url.
            break; //breaks out of the switch block, returns to top waiting for a new request.
    }
});

server.listen(3000, 'localhost', () => {  //The server is set up to listen on localhost, port 3000 for requests.  
    console.log('Listening on Port 3000.')  //Logs the statement on the terminal. 
});




