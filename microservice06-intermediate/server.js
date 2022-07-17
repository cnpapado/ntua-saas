const express    = require('express');
const app        = express();
const cors       = require('cors');
const db         = require('./firebase/firebase-config')
const countries  = require('./countries.js')
const PORT       = 8080

const totalload  = db.collection('ActualTotalLoad')
const fft        = db.collection('PhysicalFlows')
const agpt       = db.collection('GenerationPerType')

app.use(cors({
    origin: '*'
}));

//route for Actual Total Load request
app.route('/ATL').get(async (req,res)=>{
        DateTime = new Date(req.header("DateFrom").toString())
        MapCode  = countries[req.header("CountryFrom")];
        var find = totalload.where("MapCode","==", MapCode).where("DateTime",">=",DateTime);
        ret=[]
        find.get().then(async function(querySnapshot) {
            if(querySnapshot.empty){
                ret.push({"Error":"No data available"})
            }
            else {
              querySnapshot.forEach(async function(doc) {
                ret.push(doc.data())
                })
            }
            res.send(ret);
            })    
});

//route for Physical Flows request
app.route('/FFT').get((req,res)=>{
    DateTime = new Date(req.header("DateFrom").toString())
    InMapCode  = countries[req.header("CountryFrom")];
    OutMapCode = countries[req.header("CountryTo")];
    var find = fft.where("InMapCode","==", InMapCode).where("OutMapCode","==", OutMapCode).where("DateTime",">=",DateTime);
    ret=[]
    find.get().then(async function(querySnapshot) {
        if(querySnapshot.empty){
            ret.push({"Error":"No data available"});
        }
        else {
          querySnapshot.forEach(async function(doc) {
            ret.push(doc.data())
            })
        }
        res.send(ret);
        })
});

app.route('/AGPT').get(async (req,res)=>{
    DateTime          = new Date(req.header("DateFrom").toString())
    MapCode           = countries[req.header("CountryFrom")];
    ProductionType    = req.header("ProductionType");
    var find          = agpt.where("ProductionType","==",ProductionType).where("MapCode","==", MapCode).where("DateTime",">=",DateTime);
    ret = [];
    find.get().then(async function(querySnapshot) {
        if(querySnapshot.empty){
            ret.push({"Error":"No data available"});
        }
        else {
          querySnapshot.forEach(async function(doc) {
            ret.push(doc.data())
            })
        }
        res.send(ret);
        })    
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});