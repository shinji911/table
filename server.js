// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
//visit counter



// Sets up the Express App
// =============================================================
const app = express();
const PORT = 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tables data
let tables = [
    {
        customerID: 333,
        customerName: "Yoda",
        customerEmail: "greenturd@jedimasters.org",
        phoneNumber: "456-123-7894"
    },
    {
        customerID: 334,
        customerName: "Vegeta",
        customerEmail: "iamthestrongest@saiyan.com",
        phoneNumber: "789-789-1000"
    }
];

let waitlist = [
    {
        customerID: 333,
        customerName: "Yoda",
        customerEmail: "greenturd@jedimasters.org",
        phoneNumber: "456-123-7894"
    },
    {
        customerID: 334,
        customerName: "Vegeta",
        customerEmail: "iamthestrongest@saiyan.com",
        phoneNumber: "789-789-1000"
    }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
})

app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});


// Create New Reservations - takes in JSON input
app.post("/api/tables", function (req, res) {
    let newReserve = req.body;

    if (tables.length < 5) {
        tables.push(newReserve);
        res.json(true);
    } else {
        waitlist.push(newReserve);
        res.json(false);
    };
});

// Clear Tables
app.post("/api/clear", function (req, res) {    
    tables = [];
    waitlist = [];
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

var io = require('socket.io').listen(3000);


//listen to page visits from html
io.sockets.on('connection', function (socket) {

    socket.on('message', function (message) {
        console.log("Got message: " + message);
        io.sockets.emit('pageview', { 'url': message });
    });

});
