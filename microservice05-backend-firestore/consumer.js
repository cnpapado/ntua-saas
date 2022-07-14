const totalload = require('./firebase/firebase-config');
const consumer  = require('./config/kafka-consumer.js');
const topic     = 'atl-csv';


const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      //const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      //console.log(`- ${prefix} ${message.key}#${message.value}`);
      //console.log(`-${message.key}#${message.value}`);
      var key = parseInt(message.key)
      var msg = message.value.toString('utf8');
      msg = JSON.parse(msg);
      //check if a new csv file is being read
      if(key === 0) {
        console.log("new csv file!");
        let month = parseInt(msg.DateTime.slice(5,7)) + 1;
        let strdate = month.toString().concat('/','02/2022');
        let maxdate = new Date(strdate);
        let todelete = totalload.where("DateTime","<",maxdate);
        todelete.get().then(async function(querySnapshot) {
            querySnapshot.forEach(async function(doc) {
            await doc.ref.delete();
              })
            })
        }
      if(msg.AreaTypeCode === 'CTY'){
        /*Inserting data of current, row
        into database*/
        data = {
            "DateTime" : new Date(msg.DateTime),
            "ResolutionCode" : msg.ResolutionCode,
            "MapCode" : msg.MapCode,
            "TotalLoadValue" : msg.TotalLoadValue,
            "UpdateTime" : msg.UpdateTime
        }
        //console.log(data.DateTime);
        await totalload.doc(msg.DateTime.concat('-',msg.MapCode)).set(data);
    }
    },
  })
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