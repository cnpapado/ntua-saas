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
function aws_download(inFilename, next) {
    const outFilename = path.join('newfile.csv');
	  
    // console.log(inFilename);
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: inFilename
    };
  
    return s3.getObject(params, (err, data) => {
      if (err) console.error(err);                  //TODO: needs correct error handling to the caller function
      fs.writeFileSync(outFilename, data.Body);
      console.log(`${outFilename} has been created!`);
      next();
    });
  };

module.exports = {aws_download, get_availability, get_object_list};