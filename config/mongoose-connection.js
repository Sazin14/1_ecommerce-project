const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
const config = require("config");

mongoose
    .connect(`${config.get("MONGODB_URI")}/Ecommerce`)
    .then(function () {
        dbgr("Connected to MongoDB"); 
    })
    .catch(function (err) {
        dbgr("Error connecting to MongoDB:", err); 
    });