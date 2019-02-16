// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tables data
let tables = [
    {
        TableNo: 1,
        ID: 333,
        name: "Yoda",
        email: "greenturd@jedimasters.org",
        phone: "456-123-7894"
    },
    {
        TableNo: 2,
        ID: 334,
        name: "Vegeta",
        email: "iamthestrongest@saiyan.com",
        phone: "789-789-1000"
    }
];

let waitlist = [
    {
        lineNo: 1,
        name: "Yoda",
        email: "greenturd@jedimasters.org",
        phone: "456-123-7894"
    },
    {
        lineNo: 2,
        name: "Vegeta",
        email: "iamthestrongest@saiyan.com",
        phone: "789-789-1000"
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
app.post("/reserve", function (req, res) {

    var newReserve = req.body;    

    tables.push(newReserve);

    res.json();
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
