var admin = require("firebase-admin");

var serviceAccount = require("../intermediate-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
},'Intermediate-microservice');

const db = admin.firestore();

// TODO: Replace the following with your app's Firebase project configuration
//config is found under tab ProjectSettings once you've opened the project
const intermediate_ATL = db.collection('intermediate_ATL')

module.exports = intermediate_ATL;