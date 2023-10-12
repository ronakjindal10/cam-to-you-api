const AWS = require('aws-sdk');
const Selfie = require('../models/selfie');
const awsRekognitionService = require('./awsRekognitionService');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

async function uploadSelfie(selfieFile) {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `selfies/${selfieFile.originalname}`,
        Body: selfieFile.buffer,
        ContentType: selfieFile.mimetype,
        ACL: 'public-read'
    };

    const uploadResult = await s3.upload(params).promise();
    const selfie = new Selfie({ url: uploadResult.Location });
    await selfie.save();

    return selfie;
}

async function searchPhotosBySelfie(selfieId) {
    const selfie = await Selfie.findById(selfieId);
    if (!selfie) {
        throw new Error('Selfie not found');
    }

    const searchResults = await awsRekognitionService.searchFacesByImage(selfie.url);
    return searchResults.FaceMatches.map(match => match.ExternalImageId);
}

module.exports = {
    uploadSelfie,
    searchPhotosBySelfie
};