const fft = require('./firebase/firebase-config');
const consumer  = require('./config/kafka-consumer.js');
const producer  = require('./config/kafka-producer.js');
const topic     = 'fft-csv';

const delete_previous_month = (month) => {
    return new Promise((resolve,reject) => {
        let strdate = month.toString().concat('/','02/2022');
        let maxdate = new Date(strdate);
        let todelete = fft.where("DateTime","<",maxdate);
        todelete.get().then(async function(querySnapshot) {
            if(querySnapshot.empty){
              reject()
            }
            else {
              querySnapshot.forEach(async function(doc) {
              await doc.ref.delete();
              resolve()
                })
            }
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
       // publish().catch(e => console.error(`[example/producer] ${e.message}`, e))
        
      }
      //check if a new csv file is being read
      if(key === 0 && msg.DateTime!==undefined) {
        console.log("new csv file!");
        let month = parseInt(msg.DateTime.slice(5,7)) + 1;
        await delete_previous_month(month);
        }
      if(msg.InAreaTypeCode !== undefined && msg.InAreaTypeCode === 'CTY' && msg.OutAreaTypeCode === 'CTY'){
        /*Inserting data of current, row
        into database*/
       data = {
            "DateTime" : new Date(msg.DateTime),
            "ResolutionCode" : msg.ResolutionCode,
            "OutMapCode" : msg.OutMapCode,
            "InMapCode" : msg.InMapCode,
            "FlowValue" : msg.FlowValue,
            "UpdateTime" : msg.UpdateTime
        }
        //console.log(data.DateTime);
        await fft.doc(msg.DateTime.concat('-',msg.OutMapCode).concat('-',msg.InMapCode)).set(data);

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