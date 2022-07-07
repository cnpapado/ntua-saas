const fs              = require('fs');
const { parse }       = require('csv-parse');
const path            = require('path');
const execute         = require('./execute')
const insertStatement = require('./insertstm');


const readfile = async (dir,fileName,con) => {
    fs.createReadStream(path.resolve(dir + '\\' + fileName))
    .pipe(parse({ delimiter: "\t", from_line: 1 }))
    .on("data", async function (row) {
        // console.log(row)
        if(row[3] === 'CTY'){
            var items = [row[0],row[1],row[5].replace("-","_"),row[6],row[7],row[7]];
            /*Inserting data of current, row
            into database*/
            await execute(insertStatement,items,con);
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