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
			return res.status(400).send({status: "Error", headBucket_ret_data: null, headBucket_ret_error: err});
		} else {
      return res.status(200).send({status: "Success", headBucket_ret_data: data, headBucket_ret_error: null});
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
			return res.status(400).send({bucket_objects: null, error: "true"});
		} else {
      return res.status(200).send({bucket_objects: data.Contents, error: "false"});
    }
});
};

// Download a file from out S3 instance.
// Expects {csv_path:"..."} in request body 
function aws_download(req,res) {
    const ext = '.csv'
    const filePath = path.join('newfile' + ext);
	  const csv_path = req.query.csv_path;
    console.log(csv_path);
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
        }
    })
	  
      console.log(`${filePath} has been created!`);
    });
  };

module.exports = {aws_download, get_availability, get_object_list};