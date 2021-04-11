// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log("server is running");
    console.log(`running on localhost: ${port}`);
}

// get function

app.get('/allData', sendData);

function sendData(req, res) {
    res.send(projectData);
}

// post function

app.post('/add', addData);

function addData(request, response) {

    let data = request.body;
    console.log('data from server side: ', data)

    // date
    projectData.date = req.body.date;
    // temp
    projectData.date = req.body.temp;
    // content    
    projectData.content = req.body.content;

    res.send();
    console.log(projectData)
}