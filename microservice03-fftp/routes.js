require("dotenv").config({path: "./config.env"});
var express = require('express');
var app = express();

// Get functions from file
const {aws_download,get_availability,get_object_list} = require("./aws.js");

//Used for parsing request body in the download-file endpoint
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get('/download-file', function(req, res, next){
    try {
        const filename = req.query.csv_path;  //"datasets/agpt/2022_01_01_03_AggregatedGenerationPerType16.1.BC.csv";
        aws_download(filename, () => {
            res.status(200).end();
        })
    } catch(e) {
        console.error("Unhandled error: ", e);
        res.status(400).end();
    }
});

app.get('/check-availability', function(req, res, next){
    //res.setTimeout(50000);
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

module.exports = app; // for use in testing