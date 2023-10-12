const express = require('express');
const router = express.Router();
const selfieService = require('../services/selfieService');
const photoService = require('../services/photoService');
const awsRekognitionService = require('../services/awsRekognitionService');
const errorUtils = require('../utils/errorUtils');

router.get('/get-my-photos', async (req, res, next) => {
    try {
        const selfie = await selfieService.getSelfie(req.user.id);
        if (!selfie) {
            return res.status(404).json({ message: 'No selfie found' });
        }

        const faces = await awsRekognitionService.detectFaces(selfie);
        if (!faces || faces.length === 0) {
            return res.status(404).json({ message: 'No faces found in the selfie' });
        }

        const photos = await photoService.getPhotosByFaces(faces);
        if (!photos || photos.length === 0) {
            return res.status(404).json({ message: 'No photos found' });
        }

        res.json(photos);
    } catch (error) {
        errorUtils.handleError(res, error);
    }
});

module.exports = router;