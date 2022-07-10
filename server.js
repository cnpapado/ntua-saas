const db                         = require('./firebase/firebase-config');
const express                    = require('express')
const bodyParser                 = require('body-parser')
const fs                         = require('fs')
const app                        = express()
const path                       = require('path')
const readfile                   = require('./config/readfile')
const port                       = 8000;

const totalload       = require('./firebase/firebase-config');

//initialize app as an instance of express, the framework

app.use(bodyParser.urlencoded({extended:true}));
//we import the route into the server
require('./routes')(app, {});
app.listen(port, () =>{
    console.log('We are live on port ' + port);
});

const establish_connection = async () => {
  const dir = path.resolve('D:\saas/test');
  fs.readdir(dir, async function (err, files) {
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      } 
      //listing all files using forEach
      files.forEach(async function (fileName) {
          //console.log(fileName);
          if(fileName[0]!=='.'){
            let month = parseInt(fileName.slice(5,7)) + 1;
            let strdate = month.toString().concat('/','02/2022');
            let maxdate = new Date(strdate);
            let todelete = totalload.where("DateTime","<",maxdate);
            todelete.get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                doc.ref.delete();
              });
            });
            console.log(todelete);
            readfile(dir,fileName,totalload); 
          }
      });
    });
    
  }

  establish_connection();





