require("dotenv").config({path: "./config.env"});
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: "producer",
    //brokers: [process.env.CONSUMER_CONFLUENT_BROCKER],
    brokers : ["pkc-75m1o.europe-west3.gcp.confluent.cloud:9092"],
    connectionTimeout: 10000,
    requestTimeout: 30000,
    retry: {
        initialRetryTime: 100,
        retries: 20
      },      
    ssl: true,
    sasl: { 
        mechanism: 'plain', 
        //password: process.env.CONSUMER_CONFLUENT_SECRET_KEY, 
        password: "dhNV2tL0VbeeS8QaWSLV81aaWGMQiQHdcrp2tPEKNZD7E1IgjGHAYkFjTD+aH6oJ",
        //username: process.env.CONSUMER_CONFLUENT_ACCESS_KEY 
        username: "3FC2G67PRTWUUCQ2"
    }
})

const producer = kafka.producer();
module.exports = producer;