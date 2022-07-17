const express    = require('express');
const app        = express();
const cors       = require('cors');
const totalload  = require('./firebase/firebase-config');
const countries  = require('./countries.js')
const PORT = 8080

app.use(cors({
    origin: '*'
}));

app.route('/ATL').get((req,res)=>{
        DateTime = new Date(req.header("DateFrom").toString())
        MapCode  = countries[req.header("CountryFrom")];
        var find = totalload.where("MapCode","==", MapCode).where("DateTime",">=",DateTime);
        ret=[]
        find.get().then(async function(querySnapshot) {
            if(querySnapshot.empty){
            }
            else {
              querySnapshot.forEach(async function(doc) {
                ret.push(doc.data())
                })
            }
            res.send(ret);
            })

    
})

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});