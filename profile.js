const http = require('http');
const https = require('https');

// Connect to the API URL (https://teamtreehouse.com/username.json)
const get = (username) => {
    try {
        const req = https.get(`https://teamtreehouse.com/${username}.json`, (res) => {
            if(res.statusCode === 200) {
                let body = '';

                // Read the data
                res.on('data', (data) => {
                    body += data.toString();
                });

                res.on('end', () => {
                    try {
                        // Parse the data
                        const profile = JSON.parse(body);

                        // Print the data
                        printMessage(username, profile.badges.length, profile.points.JavaScript)
                    } catch(error) {
                        printError(error);
                    }
                });
            } else {
                const message = `There was an error getting the profile for ${username}. (${http.STATUS_CODES[res.statusCode]})`;
                const statusCodeError = new Error(message);

                printError(statusCodeError);
            }
        }).on('error', (error) => {
            printError(error);
        });
    } catch(error) {
        printError(error);
    }
}

// Print message to console
const printMessage = (username, badgeCount, point) => {
    const message = `${username} has ${badgeCount} total badge(s) and ${point} number of points in JavaScript!`;

    console.log(message);
}

// Print error message to console
const printError = (error) => {
    console.log(`Error: ${error.message}`);
}

module.exports.get = get;