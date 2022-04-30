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

function get_availability(res) {
	const params = {
      Bucket: process.env.S3_BUCKET
    };
  
	return s3.headBucket(params, (err, data) =>{
		if (err) {
			console.log("Error", err,err.stack);
		} else {
			console.log("Success", data);
		}
});
};

function get_object_list(res) {
	const params = {
      Bucket: process.env.S3_BUCKET,
	  Delimiter: '',
	  Prefix: ''
    };
  
	return s3.listObjects(params, (err, data) =>{
		if (err) {
			console.log("Error", err);
		} else {
			console.log("Success", data);
		}
});
};

// Download a file from out S3 instance.
// Expects {"csv_path":"..."} in request body 
function aws_download(req,res) {
    const ext = '.csv'
    const filePath = path.join('newfile' + ext);
	const {csv_path} = req.body;
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: csv_path
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

module.exports = {aws_download, get_availability, get_object_list};