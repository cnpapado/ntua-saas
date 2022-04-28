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
 module.exports = get_availability;
	