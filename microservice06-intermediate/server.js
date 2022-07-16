const express = require('express');
const app = express();
const cors = require('cors');
var validateDate = require("validate-date");
const totalload        = require('./firebase/firebase-config');


const PORT = 8080;

app.use(cors({
    origin: '*'
}));

app.route('/ATL').get((req,res)=>{
        console.log(req.query.date,req.query.country)
        DateTime = new Date(req.query.date).getTime()/1000;
        MapCode  = req.query.country;
        console.log(DateTime)
        //var find = totalload.where("MapCode","==", MapCode);
        var find = totalload.where("DateTime",">=",DateTime);
        find.get().then(async function(querySnapshot) {
            if(querySnapshot.empty){
            }
            else {
              querySnapshot.forEach(async function(doc) {
                console.log(doc.data())
                })
            }
            })

    
})

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});