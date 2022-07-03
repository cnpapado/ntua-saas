require("dotenv").config({path: "./config.env"});
const path = require("path");
const fs = require("fs");
const {aws_download,get_availability,get_object_list} = require("./aws.js");
const produce = require("./kafka.js");
// const create_filename = require("./data_names.csv");

function publish_csv() {
    let filename = "datasets/agpt/2022_01_01_03_AggregatedGenerationPerType16.1.BC.csv"; //create_filename
    aws_download(filename, () => {

        fs.readFile('./newfile.csv', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            produce("agptcsv", data);
        });
    });

};

publish_csv();