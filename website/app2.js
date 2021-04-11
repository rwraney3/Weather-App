// global variables

const { application } = require("express")

// create date

// add event listener

// async function
// POST route

const postData = async (url = '', data = {}) => {
    console.log (data)
        const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
        try {
            const newData = await response.json();
            console.log(newData);
            return newData
        } catch(error) {
            console.log('error:', error);

        }
    }
    postData('/projectData', {date:'data.date', temp:'data.temp', feelings:'data.feelings'})
