//node publish_csv.js -t fft-csv -f datasets/agpt/2022_01_01_03_AggregatedGenerationPerType16.1.BC.csv

require("dotenv").config({path: "./config.env"});
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');
const fs = require("fs");
var path = require('path');
const csv = require("fast-csv");
const {aws_download,get_availability,get_object_list} = require("./aws.js");
const producer = require("./kafka.js");


async function upload_csv(file, topic, next) {
    // connect to the kafka producer
    await producer.connect();

    var i = 0;
        
    const produce_msg = async (i, val, topic) => {
        await producer.send({
            topic: topic,
            messages: [
                { key: i.toString(), value: JSON.stringify(val)}
            ]
        })
    }

    const stream = fs.createReadStream(file)
        .pipe(csv.parse({ headers: true, delimiter: '\t' }))
        .on('error', error => console.error("Error while reading temp csv file", error))
        // .on('data', async (row) => {
        //     await produce_msg(i++, row, topic).catch(e => console.error(`[kafka-producer] ${e.message}`, e))
        //     // ++i
        // })

        .on('data', async (row) => {
            try {
                stream.pause();
                await produce_msg(i++, row, topic).catch(e => console.error(`[kafka-producer] ${e.message}`, e));
            } finally {
                stream.resume();
            }
        })

        .on('end', rowCount => {
            console.log(`Parsed ${rowCount} rows`);
            next();
        });
}



function publish_csv(filename, topic, download_first, next) {
    if (download_first == true) { // download from S3 first
        aws_download(filename, async () => {
            upload_csv("./newfile.csv", topic, next);
        });
    } 
    else { // local
        // console.log(path.join(__dirname, local_path, filename));
        // process.exit(0);
        upload_csv(filename, topic, next);
    }
    
};

const argv = yargs(hideBin(process.argv)).argv
let filename = argv.f;
let topic = argv.t;
let local_path = argv.local;

if (topic == undefined || filename == undefined) {
    console.error(`Please specify both filename (-f) and topic (-t) command line options`)
    process.exit(1);
}

if (local_path == undefined) { 
    console.log("Publishing S3://", filename)
    // download file from S3
    publish_csv(filename, topic, true, () => {process.exit(0);});
} else {
    // access file locally from -local <path>
    let filepath = path.join(__dirname, local_path, filename);
    console.log("Publishing local:", filepath)
    publish_csv(filepath, topic, false, () => {process.exit(0);});
}


