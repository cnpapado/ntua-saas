require("dotenv").config({path: "./config.env"});
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: "producer",
    brokers: [process.env.CONSUMER_CONFLUENT_BROCKER],
    connectionTimeout: 3000,  
    ssl: true,
    sasl: { 
        mechanism: 'plain', 
        password: process.env.CONSUMER_CONFLUENT_SECRET_KEY, 
        username: process.env.CONSUMER_CONFLUENT_ACCESS_KEY 
    }
})

const producer = kafka.producer();
module.exports = producer;