const https = require("https");
const fs = require("fs");
const express = require("express");
const path = require("path");

// Create an Express app
const app = express();

// Your local IP address (e.g., 192.168.1.5)
//const localIP = '192.168.0.105';  // Replace with your actual IP address
const localIP = "127.0.0.1";
const port = 3000; // Or any port you prefer

// Read SSL certificates
const options = {
  key: fs.readFileSync(path.join(__dirname, "key.pem"), "utf-8"), // The private key
  cert: fs.readFileSync(path.join(__dirname, "cert.pem"), "utf-8"), // The certificate
  passphrase: "hello",
};

// Serve the HTML file over HTTPS
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html"); // Ensure this is the path to your HTML file
});

// Set up the HTTPS server to serve the app
https.createServer(options, app).listen(port, localIP, () => {
  console.log(`Server running on https://${localIP}:${port}`);
});
