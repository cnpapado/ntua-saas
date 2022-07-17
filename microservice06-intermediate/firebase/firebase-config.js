var admin = require("firebase-admin");

var serviceAccount = require("../new-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// TODO: Replace the following with your app's Firebase project configuration
//config is found under tab ProjectSettings once you've opened the project
const totalload = db.collection('ActualTotalLoad')

module.exports = db;