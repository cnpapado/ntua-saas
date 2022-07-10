require("dotenv").config({path: "./config.env"});
const path = require("path");
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');
const fs = require("fs");
const csv = require("fast-csv");
const {aws_download,get_availability,get_object_list} = require("./aws.js");
const produce = require("./kafka.js");
// const create_filename = require("./data_names.csv");

function publish_csv(filename, topic) {
    // let filename = "datasets/agpt/2022_01_01_03_AggregatedGenerationPerType16.1.BC.csv"; //create_filename
    // console.log("filename ", filename)
    aws_download(filename, () => {
        fs.createReadStream("./newfile.csv")
            .pipe(csv.parse({ headers: true }))
            .on('error', error => console.error("Error while reading temp csv file", error))
            .on('data', row => {
                produce()
                    .catch((err) => {
                        console.error(`Producer error:\n${err}`);
                        process.exit(1);
                    });
            })
            .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
        
    });
};

const argv = yargs(hideBin(process.argv)).argv
// console.log(myArgs)
let filename = argv.f;
let topic = argv.t;
if (topic == undefined || filename == undefined) {
    console.error(`Please specify both filename (-f) and topic (-t) command line options`)
    process.exit(1);
}
console.log(filename)
publish_csv(filename, "fft-csv"); //(filename, topic)