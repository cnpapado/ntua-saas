const db = require('./firebase/firebase-config')
const totalload = db.collection('ActualTotalLoad')
const fft = db.collection('PhysicalFlows')
//console.log(totalload)