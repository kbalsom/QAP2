const fs = require('fs');  //Imports the global fs (filesystem) module, and assigns it to the constant fs.
const EventEmitter = require('events'); //Imports the global events module, and assigns it to the constant EventEmiter.
class MyEmitter extends EventEmitter {}; //Creates a class MyEmitter, that inherits the properties of EventEmiiter.
const myEmitter = new MyEmitter(); //Assigns the constant myEmitter to a new instance of the MyEmitter class.
const logger = require('./logger.js');  //Imports the logger.js file, and assigns it to the constant logger. This allows any modules exported there to be used here. 


myEmitter.addListener('read', (msg) => { //This sets up a listener, which listens for events called "read". It is passed a "msg" as a parameter from the event, which it logs to the terminal, and appends the current date file by invoking the append function in logger.js.
    console.log(msg);
    logger.append(msg)
});


function indexPage(path, response) { //Creates a function called indexPage, which is called in index.js when the url "/" is accessed. It takes path and response as as parameters. This function is called by index.js, and it in turn calls the displayFile function below to response.write the html code found in index.html to the browser. 
    displayFile(path, response); //This calls the displayFile function, which is below.
}

function aboutPage(path, response) { //Creates a function called aboutPage, which is called in index.js when the url "/about" is accessed. It takes path and response as as parameters. This function is called by index.js, and it in turn calls the displayFile function below to response.write the html code found in about.html to the browser. 
    displayFile(path, response); //This calls the displayFile function, which is below.
}

function contactUsPage(path, response) { //Creates a function called contactUsPage, which is called in index.js when the url "/contactus" is accessed. It takes path and response as as parameters. This function is called by index.js, and it in turn calls the displayFile function below to response.write the html code found in contactus.html to the browser. 
    displayFile(path, response); //This calls the displayFile function, which is below.
}

function subscribePage(path, response) { //Creates a function called subscribePage, which is called in index.js when the url "/subscribe" is accessed. It takes path and response as as parameters. This function is called by index.js, and it in turn calls the displayFile function below to response.write the html code found in subscribe.html to the browser. 
    displayFile(path, response); //This calls the displayFile function, which is below.
}

function contactPage(path, response) { //Creates a function called contactPage, which is called in index.js when the url "/contact" is accessed. It takes path and response as as parameters. This function is called by index.js, and it in turn calls the displayFile function below to response.write the html code found in contact.html to the browser. 
    displayFile(path, response); //This calls the displayFile function, which is below.
}

function weatherPage(path, response) { //Creates a function called weatherPage, which is called in index.js when the url "/weather" is accessed. It takes path and response as as parameters. This function is called by index.js, and it in turn calls the displayFile function below to response.write the html code found in weather.html to the browser. 
    displayFile(path, response); //This calls the displayFile function, which is below.
}

function forbiddenPage(url, path, response) { //Creates a function called forbiddenPage, which is called in index.js when the url "/forbidden" is accessed. It takes path and response as as parameters. This function is called by index.js, and it in turn calls the displayFile function below to response.write the html code found in forbidden.html to the browser. 
    displayFile(path, response); //This calls the displayFile function, which is below.
}

function ghostPage(url, path, response) { //Creates a function called ghostPage, which is called in index.js when the url "/ghost" is accessed. It takes url, path and response as as parameters. This function is called by index.js, and it in turn calls the displayFile function below to response.write the html code found in ghost.html to the browser. 
    displayFile(path, response); //This calls the displayFile function, which is below.
}



function notFoundPage(url, path, response) { //Creates a function called notFoundPage, which is called in index.js when the url "/notfound" is accessed. It takes path and response as as parameters. This function is called by index.js, and it in turn calls the displayFile function below to response.write the html code found in notfound.html to the browser. 
    displayFile(path, response); //This calls the displayFile function, which is below.
}

function displayFile(path, response) { //Creates a function called displayFile, which takes path and response as parameters. These paremeters are passed in when it is called by the functions above. Remember that the path value it is given is ./views and the url being accessed concatenated on to it, which happens in index.js. 
    fs.readFile(path, function(err, data) { //reads the file specified by the path, aka the html file that corresponds with the url being accessed.
        if(err) {
            console.log(err);
            response.end(); //If there is an error, it logs the error and ends the response. 
        } else { //If there is no error it runs the code below:
            myEmitter.emit('read', `File was Read: ${path}`) //Event called read, which is being listened for above. It passes a msg to that listener, which is "File was read" and the path. 
            response.writeHead(response.statusCode, {'Content-Type': 'text/html'}); //response.writeHead takes two paremeters: the status code of the response and the type of content that is written below, in this case it is html data. 
            response.write(data); //Writes the html data to the browser. 
            response.end(); //Ends the response. 
        };   
    });
};

module.exports = {  //Exports all the page functions so that they are available for import elsewhere. In this case they are imported and used in index.js.
    indexPage, 
    aboutPage,
    contactUsPage,
    subscribePage,
    contactPage,
    forbiddenPage,
    weatherPage,
    ghostPage,
    notFoundPage,
}
