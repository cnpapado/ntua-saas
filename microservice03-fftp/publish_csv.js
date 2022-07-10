//node publish_csv.js -t fft-csv -f datasets/agpt/2022_01_01_03_AggregatedGenerationPerType16.1.BC.csv

require("dotenv").config({path: "./config.env"});
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');
const fs = require("fs");
const csv = require("fast-csv");
const {aws_download,get_availability,get_object_list} = require("./aws.js");
const producer = require("./kafka.js");

const produce_msg = async (i, row) => {
    await producer.send({
        topic: topic,
        messages: [
            { key: i.toString(), value: JSON.stringify(row)}
        ]
    })
}

function publish_csv(filename, topic) {
    // connect to the kafka producer
    producer.connect();
    aws_download(filename, async () => {
        let i = 0;
        fs.createReadStream("./newfile.csv")
            .pipe(csv.parse({ headers: true, delimiter: '\t' }))
            .on('error', error => console.error("Error while reading temp csv file", error))
            .on('data', (row) => {
                produce_msg(i, row).catch(e => console.error(`[kafka-producer] ${e.message}`, e))
                ++i
            })
            .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
        
    });
};

const argv = yargs(hideBin(process.argv)).argv
let filename = argv.f;
let topic = argv.t;

if (topic == undefined || filename == undefined) {
    console.error(`Please specify both filename (-f) and topic (-t) command line options`)
    process.exit(1);
}

publish_csv(filename, topic)