const producer  = require('./config/kafka-producer.js');
const totalload = require('./firebase/firebase-config');
topic = 'atl-csv'
const run = async () => {
    await producer.connect();
    var i = 0;
    i++;
   const snapshot = await totalload.get();
    snapshot.forEach(doc => {
        produce_msg(i,doc.data(),topic);
    })
    //await Promise.all(promiselist)
}
const produce_msg = async (i, val, topic) => {
    await producer.send({
        topic: topic,
        messages: [
            { key: i.toString(), value: JSON.stringify(val)}
        ]
    })
}
run().catch(e => console.error(`[example/producer] ${e.message}`, e))

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
