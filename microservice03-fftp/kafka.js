const Kafka = require('node-rdkafka');

const ERR_TOPIC_ALREADY_EXISTS = 36;

function ensureTopicExists() {
  const adminClient = Kafka.AdminClient.create({
    'bootstrap.servers': "pkc-03vj5.europe-west8.gcp.confluent.cloud:9092",
    'sasl.username': "OVB37BUHAGPWJKF5",
    'sasl.password': "DVPX7TPSnSwiKSrGiXAONQPi7rjNVVHSe87PiOQQNsAi02IHzEtdw3cSyZOpGb0g",
    'security.protocol': "SASL_SSL",
    'sasl.mechanisms': "PLAIN"
  });

  return new Promise((resolve, reject) => {
    adminClient.createTopic({
      topic: "fft-csv",
      num_partitions: 1,
      replication_factor: 3
    }, (err) => {
      if (!err) {
        console.log(`Created topic`);
        return resolve();
      }

      if (err.code === ERR_TOPIC_ALREADY_EXISTS) {
        return resolve();
      }

      return reject(err);
    });
  });
}

function createProducer(onDeliveryReport) {
  const producer = new Kafka.Producer({
    'bootstrap.servers': "pkc-03vj5.europe-west8.gcp.confluent.cloud:9092",
    'sasl.username': "OVB37BUHAGPWJKF5",
    'sasl.password': "DVPX7TPSnSwiKSrGiXAONQPi7rjNVVHSe87PiOQQNsAi02IHzEtdw3cSyZOpGb0g",
    'security.protocol': "SASL_SSL",
    'sasl.mechanisms': "PLAIN",
    'dr_msg_cb': true
  });

  return new Promise((resolve, reject) => {
    producer
      .on('ready', () => resolve(producer))
      .on('delivery-report', onDeliveryReport)
      .on('event.error', (err) => {
        console.warn('event.error', err);
        reject(err);
      });
    producer.connect();
  });
}

async function produce(key, value) {
  await ensureTopicExists();

  const producer = await createProducer((err, report) => {
    if (err) {
      console.warn('Error producing', err)
    } else {
      const {topic, partition, value} = report;
      console.log(`Successfully produced record to topic "${topic}" partition ${partition} ${value}`);
    }
  });

  console.log(`Producing record ${key}\t${value}`);

  producer.produce("fft-csv", -1, value, key);

  producer.flush(10000, () => {
    producer.disconnect();
  });
}

// produce()
//   .catch((err) => {
//     console.error(`Something went wrong:\n${err}`);
//     process.exit(1);
//   });

module.exports = produce;