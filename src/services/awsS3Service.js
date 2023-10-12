const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const uploadFile = (filePath, bucketName, key) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      }
      const params = {
        Bucket: bucketName,
        Key: key,
        Body: data
      };
      s3.upload(params, (s3Err, data) => {
        if (s3Err) reject(s3Err);
        console.log(`File uploaded successfully at ${data.Location}`);
        resolve(data.Location);
      });
    });
  });
};

module.exports = {
  uploadFile
};