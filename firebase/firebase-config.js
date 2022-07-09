var admin = require("firebase-admin");

var serviceAccount = require("../saas-56-firebase-adminsdk-i7zm4-53983ee4a1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://saas-56-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.firestore();

// TODO: Replace the following with your app's Firebase project configuration
//config is found under tab ProjectSettings once you've opened the project
const totalload = db.collection('ActualTotalLoad')

module.exports = totalload;