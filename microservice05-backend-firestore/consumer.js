const totalload = require('./firebase/firebase-config');
const consumer  = require('./config/kafka-consumer.js');
const producer  = require('./config/kafka-producer.js');
const topic     = 'atl-csv';
const runScript = require('./child_process.js');
const publish   = require('./publish_to_frontend.js');

const delete_previous_month = (month) => {
    return new Promise((resolve,reject) => {
        let strdate = month.toString().concat('/','02/2022');
        let maxdate = new Date(strdate);
        let todelete = totalload.where("DateTime","<",maxdate);
        todelete.get().then(async function(querySnapshot) {
            querySnapshot.forEach(async function(doc) {
            await doc.ref.delete();
            resolve()
              })
            })

    })
}
const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);
      var key = parseInt(message.key)
      var msg = message.value.toString('utf8');
      msg = JSON.parse(msg);
      console.log(msg)
      //notify that new add has been read and added to the db
      if(msg.EOF !== undefined){
        console.log("attempting to publish");
        publish().catch(e => console.error(`[example/producer] ${e.message}`, e))
        
      }
      //check if a new csv file is being read
      if(key === 0 && msg.DateTime!==undefined) {
        console.log("new csv file!");
        let month = parseInt(msg.DateTime.slice(5,7)) + 1;
        //await delete_previous_month(month);
        }
      if(msg.AreaTypeCode !== undefined && msg.AreaTypeCode === 'CTY'){
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