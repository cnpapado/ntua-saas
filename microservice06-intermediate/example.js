const {db,db_atl} = require('./firebase/firebase-config')
db.collection("Test").doc("agpt").set({"hey":"hey"})
db_atl.collection("Test1").doc("atl").set({"hey":"hey"})
//console.log(totalload)