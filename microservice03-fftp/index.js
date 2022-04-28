require("dotenv").config({path: "./config.env"});
var express = require('express');
var app = express();
const aws_download = require("./aws.js");
const get_availability = require("./check_aws_availability.js");
const get_object_list = require("./list_aws_objects.js");
 
app.get('/download-file', function(req, res, next){
    try {
        aws_download(res)
    } catch(e) {
        console.error(e)
        res.status(400).end()
    }

});

app.get('/check-availability', function(req, res, next){
    try {
        get_availability(res)
    } catch(e) {
        console.error(e)
        res.status(400).end()
    }

});

app.get('/get-objects', function(req, res, next){
    try {
        get_object_list(res)
    } catch(e) {
        console.error(e)
        res.status(400).end()
    }

});

app.listen(process.env.PORT, function () {
   console.log('express is online');
})