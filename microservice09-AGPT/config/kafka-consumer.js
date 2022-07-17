require("dotenv").config({path: "./config.env"});
const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({
    clientId: "consumer",
    brokers: [process.env.CONFLUENT_BROCKER],
    logLevel: logLevel.ERROR,
    connectionTimeout: 10000,
    requestTimeout: 30000,
    retry: {
        initialRetryTime: 100,
        retries: 8
      },        
    ssl: true,
    sasl: { 
        mechanism: 'plain', 
        password: process.env.CONFLUENT_SECRET_KEY, 
        username: process.env.CONFLUENT_ACCESS_KEY 
    }
})

const consumer = kafka.consumer({ groupId: 'my-group' })
module.exports = consumer