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
 module.exports = get_object_list;
	