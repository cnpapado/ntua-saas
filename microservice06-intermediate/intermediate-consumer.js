const totalload        = require('./firebase/firebase-config');
const intermediate_ATL = require('./firebase/intermediate-config');
const consumer         = require('./config/kafka-consumer.js');
const producer         = require('./config/kafka-producer.js');
const topic            = 'atl-csv';
const publish          = require('./publish_to_frontend.js');

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);
      var key = parseInt(message.key)
      //var msg = message.value.toString('utf8');
      msg = JSON.parse(message.value);
      console.log(msg.DateTime._seconds)
      //notify that new add has been read and added to the db
      if(msg.EOF !== undefined){
        console.log("attempting to publish");
        //publish().catch(e => console.error(`[example/producer] ${e.message}`, e))
      }
        
        data = {
          "DateTime" :  new Date(msg.DateTime._seconds * 1000 + msg.DateTime._nanoseconds/1000000),
          "ResolutionCode" : msg.ResolutionCode,
          "MapCode" : msg.MapCode,
          "TotalLoadValue" : msg.TotalLoadValue,
          "UpdateTime" : msg.UpdateTime
      }
      //console.log(data.DateTime);
      await intermediate_ATL.doc( (new Date(msg.DateTime._seconds * 1000 + msg.DateTime._nanoseconds/1000000)).toString().concat('-',msg.MapCode)).set(data);
    }
  })
  console.log("reach")
}

run().catch(e => console.error(`[example/consumer] ${e.message}`, e))

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.forEach(type => {
  process.on(type, async e => {
    try {
      console.log(`process.on ${type}`)
      console.error(e)
      await consumer.disconnect()
      process.exit(0)
    } catch (_) {
      process.exit(1)
    }
  })
})

signalTraps.forEach(type => {
  process.once(type, async () => {
    try {
      await consumer.disconnect()
    } finally {
      process.kill(process.pid, type)
    }
  })
})