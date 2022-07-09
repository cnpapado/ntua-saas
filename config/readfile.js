const fs              = require('fs');
const { parse }       = require('csv-parse');
const path            = require('path');
const {addDoc}        = require('firebase/firestore');
const execute         = require('./execute')
const insertStatement = require('./insertstm');

const readfile = async (dir,fileName,totalload) => {
    fs.createReadStream(path.resolve(dir + '\\' + fileName))
    .pipe(parse({relaxed_quotes: true, delimiter: "\t", from_line: 2 }))
    .on("data", async function (row) {
        //console.log(row)
        row = row[0].split('\t')
        if(row[3] === 'CTY'){
            var items = [row[0],row[1],row[5].replace("-","_"),row[6],row[7],row[7]];
            /*Inserting data of current, row
            into database*/
            if (row[5] === 'AT'){
                console.log(fileName,row);
            }
            data = {
                "DateTime" : row[0],
                "ResolutionCode" : row[1],
                "MapCode" : row[5],
                "TotalLoadValue" : row[6],
                "UpdateTime" : row[7]
            }
            await totalload.doc(row[0].concat('-',row[1].concat('-',row[7]))).set(data);
            //await execute(insertStatement,items,con);
        }
    })
    .on("end", function () {
       console.log("file finished");
     })
    .on("error", function (error) {
       console.log(error.message);
    });
};
module.exports = readfile;