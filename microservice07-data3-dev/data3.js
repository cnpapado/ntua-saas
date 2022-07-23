var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");   // <- GET THIS FILE FROM Firestore, it is private

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const COLLECTION_NAME = "PhysicalFlows"

const db = admin.firestore();

// db.collection("TestCollection").doc("TestDocument")
//     .get().then( doc => {
//         if(!doc.exists) {
//             console.log("ERROR: No such document!");
//         }
//         console.log(doc.data());
// })

//XXX: DO NOT USE IF DB IS HUGE
db.collection(COLLECTION_NAME)
    .get().then( coll => {
        let documents = coll.docs.map(doc => doc.data())
        console.log(documents);
})