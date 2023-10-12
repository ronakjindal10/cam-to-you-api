const express = require('express');
const router = express.Router();
const selfieService = require('../services/selfieService');
const selfieUpload = require('../middlewares/selfieUpload');
const awsRekognitionService = require('../services/awsRekognitionService');
const errorUtils = require('../utils/errorUtils');

router.post('/', selfieUpload.single('selfie'), async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            throw errorUtils.createError('No file uploaded', 400);
        }

        const selfie = await selfieService.createSelfie(file);
        const indexedFaces = await awsRekognitionService.indexFaces(selfie);

        if (!indexedFaces || indexedFaces.length === 0) {
            throw errorUtils.createError('No faces detected in the selfie', 400);
        }

        res.status(200).json({
            message: 'Selfie uploaded and faces indexed successfully',
            data: indexedFaces
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;