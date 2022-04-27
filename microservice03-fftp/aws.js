require("dotenv").config({path: "./config.env"});
const AWS = require("aws-sdk");
const path = require("path");
const fs = require("fs");

//configure the AWS environment
AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
});

const s3 = new AWS.S3();

// This is some kind of availability check. We should add it into a separate endpoint
s3.headBucket({
  Bucket: process.env.S3_BUCKET,
}, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
})

// Call S3 to obtain a list of the objects in the bucket. We should also add this into an endpoint
s3.listObjects({
    Bucket: process.env.S3_BUCKET,
  }, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });

// Download a file from out S3 instance.
// We should wrap it into a GET endpoint fetching filename from request's URL
function aws_download(res) {
    const ext = '.csv'
    const filePath = path.join('newfile' + ext);
    
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: 'sampledata01_stations.csv'
    };
  
    return s3.getObject(params, (err, data) => {
      if (err) console.error(err);
      fs.writeFileSync(filePath, data.Body);
  
      //download
      res.download(filePath, function (err) {
        if (err) {
          // Handle error, but keep in mind the response may be partially-sent
          // so check res.headersSent
          // Find out what should we do with this
          console.log(res.headersSent)
        } else {
          // remove temp file - unnecessary, right?
        //   fs.unlink(filePath, function (err) {
        //       if (err) {
        //           console.error(err);
        //       }
        //       console.log('Temp File Delete');
        //   });
        }
      })
  
      console.log(`${filePath} has been created!`);
    });
  };

  module.exports = aws_download;