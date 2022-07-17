require("dotenv").config({path: "./config.env"});
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: "consumer",
    brokers: [process.env.CONFLUENT_BROCKER],  
    ssl: true,
    sasl: { 
        mechanism: 'plain', 
        password: process.env.CONFLUENT_SECRET_KEY, 
        username: process.env.CONFLUENT_ACCESS_KEY 
    }
})

const consumer = kafka.consumer({ groupId: 'my-group' })
module.exports = consumer