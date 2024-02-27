const express = require('express');
const http = require("http");
const cors = require('cors');
const fs = require('fs');
const asyncHandler = require('express-async-handler')
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

const app = express()

const data = require('../data.json');

myArr = data.members;

const server = http.createServer(app);

const PORT = process.env.PORT || 5000

app.use(cors());
app.use(bodyParser.json());

app.get("/members", async (req, res, next) => {
    res.send(data);
})

app.get("/members", async (req, res, next) => {
    res.send(data);
})

// write to file
const addMemeber = asyncHandler(async(req, res) => {
    myArr = req.body;

    fs.writeFile("../data.json", JSON.stringify(myArr), (err) => {
        if (err) throw err;
    })
})

const deleteMember = asyncHandler(async(req, res) => {
    myArr = req.body;
    
    fs.writeFile("../data.json", JSON.stringify(myArr), (err) => {
        if (err) throw err;
    })
})

app.post("/api/members", async (req, res, next) => {
   await addMemeber(req);    
})

app.delete("/api/members", async (req, res, next) => {
   await deleteMember(req);    
})

server.listen(PORT, () => {console.log(`Listening on Port: ${PORT}`)});


