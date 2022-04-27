require("dotenv").config({path: "./config.env"});
var express = require('express');
var app = express();
const aws_download = require("./aws.js");
 
app.get('/download-file', function(req, res, next){
    try {
        aws_download(res)
    } catch(e) {
        console.error(e)
        res.status(400).end()
    }

});
 
// Add the other 2 endpoints ...


app.listen(process.env.PORT, function () {
   console.log('express is online');
})