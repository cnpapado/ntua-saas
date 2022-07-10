const { Kafka } = require('kafkajs');
// import * as env from "env-var"

const kafka = new Kafka({
    clientId: "producer",
    brokers: ["pkc-03vj5.europe-west8.gcp.confluent.cloud:9092"],  // [env.get("KAFKA_BOOTSTRAP_SERVER").required().asString()],
    ssl: true,
    sasl: { 
        mechanism: 'plain', 
        password: "CIlD5L/yeLYdSf1or8PUHYHpQ03bNkKt5pKy8ibDXbhYOIvzAqMMsTcWzH8s2yma", 
        username: "VUVCRRWVK4VCC4IE" 
    }
})

const producer = kafka.producer();
module.exports = producer;
// const run = async () => {
//     await producer.connect()
//     var i = 0
//     while (true) {
//         await producer.send({
//             topic: "fft-csv",
//             messages: [
//                 { key: i.toString(), value: Math.random().toString() }
//             ]
//         })
//         ++i
//     }
// }

// run().catch(e => console.error(`[kafka-producer] ${e.message}`, e))