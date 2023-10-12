const express = require('express');
const router = express.Router();
const selfieService = require('../services/selfieService');
const photoService = require('../services/photoService');
const errorUtils = require('../utils/errorUtils');

router.get('/check-for-new-photos', async (req, res, next) => {
    try {
        const selfie = await selfieService.getLatestSelfie(req.user.id);
        if (!selfie) {
            return res.status(404).json({ message: 'No selfie found. Please take a selfie first.' });
        }

        const newPhotos = await photoService.getNewPhotos(selfie);
        if (newPhotos.length === 0) {
            return res.status(404).json({ message: 'No new photos found.' });
        }

        return res.json(newPhotos);
    } catch (error) {
        errorUtils.handleError(res, error);
    }
});

module.exports = router;