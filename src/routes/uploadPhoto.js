const express = require('express');
const router = express.Router();
const uploadPhotoController = require('../controllers/uploadPhotoController');
const photoUpload = require('../middlewares/photoUpload');

router.post('/upload-photo', photoUpload, uploadPhotoController.uploadPhoto);

module.exports = router;