const express = require('express');
const router = express.Router();
const multer = require('multer');
const photoUpload = multer({ dest: 'uploads/' });

const awsS3Service = require('../services/awsS3Service');
const awsRekognitionService = require('../services/awsRekognitionService');
const photoService = require('../services/photoService');
const errorUtils = require('../utils/errorUtils');

router.post('/upload-photo', photoUpload.single('photo'), async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            throw errorUtils.createError('No file uploaded', 400);
        }

        const photoFormat = file.mimetype.split('/')[1];
        if (!['jpg', 'jpeg', 'png'].includes(photoFormat)) {
            throw errorUtils.createError('Invalid file format. Only jpg, jpeg and png are allowed', 400);
        }

        const s3Response = await awsS3Service.uploadPhoto(file);
        const rekognitionResponse = await awsRekognitionService.indexFaces(s3Response.Location);

        const photo = await photoService.createPhoto({
            s3Key: s3Response.Key,
            rekognitionFaceIds: rekognitionResponse.FaceRecords.map(record => record.Face.FaceId)
        });

        res.status(201).json({
            message: 'Photo uploaded successfully',
            photo
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;