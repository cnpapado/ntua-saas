const express         = require('express')
const mysql           = require('mysql')
const bodyParser      = require('body-parser')
const fs              = require('fs')
const app             = express()
const credentials1    = require('./config/credentials1')
const credentials2    = require('./config/credentials2')
const path            = require('path')
//const { parse }   = require("csv-parse");
const connection      = require('./config/connect')
const totalload       = require('./config/queries')
const readfile        = require('./config/readfile')
const execute         = require('./config/execute')
const deleteStatement = require('./config/deletestm')

const { create }      = require('domain');
const port            = 8000;
//initialize app as an instance of express, the framework

app.use(bodyParser.urlencoded({extended:true}));
//we import the route into the server
require('./routes')(app, {});
app.listen(port, () =>{
    console.log('We are live on port ' + port);
});

//establish a connection
function create_connection(credentials) {
  return new Promise((resolve) => {
    var con = mysql.createConnection(credentials);
    resolve(con);
  })
}
const establish_connection = async () => {
  let con;
  // try {
  //   con = await create_connection(credentials1);
  // }
  // catch(e){
  con = await create_connection(credentials2);
  connection(con);
  await execute(totalload(),[],con);
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
            let month = parseInt(fileName.slice(5,7));
            await execute(deleteStatement(month),[],con);
            readfile(dir,fileName,con); 
          }
      });
    });
    
  }

  establish_connection();





