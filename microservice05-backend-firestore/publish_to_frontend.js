const producer  = require('./config/kafka-producer.js');
const totalload = require('./firebase/firebase-config');
require("dotenv").config({path: "./config.env"});
topic = 'atl-csv'

const publish = async () => {
    
    await producer.connect();
    var i = 0;
    i++;
   const snapshot = await totalload.get();
    snapshot.forEach(async (doc) => {
        console.log(doc.data());
        await produce_msg(i,doc.data(),topic);
    })
    //await produce_msg(0,{'hello':'hi'},topic);
}
const produce_msg = async (i, val, topic) => {
    await producer.send({
        topic: topic,
        messages: [
            { key: i.toString(), value: JSON.stringify(val)}
        ]
    })
}
//comment out that line in order to run the dunction in the consumer.js 
publish().catch(e => console.error(`[example/producer] ${e.message}`, e))

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.forEach(type => {
  process.on(type, async () => {
    try {
      console.log(`process.on ${type}`)
      await producer.disconnect()
      process.exit(0)
    } catch (_) {
      process.exit(1)
    }
  })
})

signalTraps.forEach(type => {
  process.once(type, async () => {
    try {
      await producer.disconnect()
    } finally {
      process.kill(process.pid, type)
    }
  })
})
module.exports = publish