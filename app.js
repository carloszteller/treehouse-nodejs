// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
const https = require('https');

// Connect to the API URL (https://teamtreehouse.com/username.json)
const getProfile = (username) => {
    const req = https.get(`https://teamtreehouse.com/${username}.json`, (res) => {
        let body = '';

        // Read the data
        res.on('data', (data) => {
            body += data.toString();
        });

        res.on('end', () => {
            // Parse the data
            const profile = JSON.parse(body);

            // Print the data
            printMessage(username, profile.badges.length, profile.points.JavaScript)
        });
    });
}

// Print message to console
const printMessage = (username, badgeCount, point) => {
    const message = `${username} has ${badgeCount} total badge(s) and ${point} number of points in JavaScript!`;

    console.log(message);
}

const user = process.argv.slice(2);

getProfile(user);