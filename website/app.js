/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=0a1412ebc534bf33dafd0211321ab8cc'
let country = ',us';
const newZip = document.getElementById('zip').value;

document.getElementById('generate').addEventListener('click', performAction);

function performAction(){
    const newZip =  document.getElementById('zip').value;
    getWeather(baseURL, newZip, country, apiKey)
}
const getWeather = async (baseURL, zip, country, key)=> {
    const res = await fetch(baseURL+zip+country+key)
    try {
        const data = await res.json();
        console.log(data);
        postData('/server', )
        return data;
  } catch(error) {
      console.log("error", error);
    // appropriately handle the error
  }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();