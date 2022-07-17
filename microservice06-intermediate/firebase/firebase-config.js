var admin = require("firebase-admin");

var serviceAccount    = require("../new-key.json");
var serviceAccountATL = require("../atl-key.json");


var agpt = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
},'agpt');

var atl = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountATL)
},'atl');

var fft = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountATL)
},'fft');

const db_agpt = admin.firestore(agpt);
const db_atl = admin.firestore(atl);
const db_fft = admin.firestore(fft);


// TODO: Replace the following with your app's Firebase project configuration
//config is found under tab ProjectSettings once you've opened the project
module.exports = {db_agpt,db_atl,db_fft};