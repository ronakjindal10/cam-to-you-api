const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const rekognition = new AWS.Rekognition();

const indexFaces = async (bucket, photo) => {
  const params = {
    CollectionId: process.env.AWS_REKOGNITION_COLLECTION_ID,
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: photo
      }
    },
    DetectionAttributes: ['ALL']
  };

  try {
    const response = await rekognition.indexFaces(params).promise();
    return response.FaceRecords;
  } catch (error) {
    throw error;
  }
};

const searchFaces = async (bucket, photo) => {
  const params = {
    CollectionId: process.env.AWS_REKOGNITION_COLLECTION_ID,
    FaceMatchThreshold: 98,
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: photo
      }
    },
    MaxFaces: 10
  };

  try {
    const response = await rekognition.searchFacesByImage(params).promise();
    return response.FaceMatches;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  indexFaces,
  searchFaces
};