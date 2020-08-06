const http = require('http');
const keys = require('./keys');

const get = (query) => {
    try {
        const req = http.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&APPID=${keys.owm}`, (res) => {
            let body = '';

            res.on('data', (data) => {
                body += data.toString();
            });

            res.on('end', () => {
                try {
                    const weather = JSON.parse(body);

                    console.log(`The current temperature for ${weather.name} is ${weather.main.temp}°F.`);
                } catch(error) {
                    console.log(error.message);
                }
            });
        }).on('error', (error) => {
            console.log(error.message);
        });
    } catch(error) {
        console.log(error.message);
    }
}

module.exports.get = get;