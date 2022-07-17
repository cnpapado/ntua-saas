var admin = require("firebase-admin");

var serviceAccount = require("../saas-56-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://saas-56-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.firestore();

// TODO: Replace the following with your app's Firebase project configuration
//config is found under tab ProjectSettings once you've opened the project
const fft = db.collection('PhysicalFlows')

module.exports = fft;