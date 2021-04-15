/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&units=imperial&appid=0a1412ebc534bf33dafd0211321ab8cc'
let country = ',us';
let baseURLLocalAPI = 'http://localHost:8000';

// Create a new date instance dynamically with JS


let d = new Date();
let month = d.getMonth() +1;
let newDate =  month +'-'+ d.getDate()+'-'+ d.getFullYear();

// Time

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = (parseInt(h, 10)) + ":" + m + ":" +s + " " + session;
    document.getElementById("MyClockDisplay").textContent = `Current time: ${time}`;
    
    setTimeout(showTime, 1000);
    
}
showTime();

// add event listener

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    let zip = document.getElementById('zip').value;
    let newContent = document.getElementById('feelings').value;

    if (zip == "") {
        alert("A 5-digit zip code is required");
        return false;
    }

    getWeather(baseURL, zip, country, apiKey)
        .then (function(data) {
            console.log(data);
                // add data to POST request
                postData('/add', { date: newDate, temp: data.main.temp, name: data.name, content: newContent });
            })
        .then (() => {
            updateUI();
            
})
}

// write an async function that uses FETCH() to make a GET request to OpenWeatherMap API
const getWeather = async(baseURL, zip, country, apiKey)=>{
    const res = await fetch(baseURL+zip+country+apiKey)
        try {
            const data = await res.json();
            return data;
        } catch(error) {
            console.log('error:', error);
        }
    }

// POST route

const postData = async function(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(data)
});

try {
        const data = await response.json();
        console.log('Data Received:', data);
        console.log(data);
        return data;
    } catch(error) {
        console.log('error:', error);
    }
}

// update UI function

const updateUI = async function()  {
    const request = await fetch('/allData');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('location').innerHTML = `Currently in ${allData.name}`;
        document.getElementById('temp').innerHTML = `Temp: ${allData.temp}° F`;
        document.getElementById('content').innerHTML = `I am feeling: ${allData.content}`;
    } catch(error) {
        console.log('error: ', error);
    }
}
