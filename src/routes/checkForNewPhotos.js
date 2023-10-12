const express = require('express');
const router = express.Router();
const checkForNewPhotosController = require('../controllers/checkForNewPhotosController');
const errorHandler = require('../middlewares/errorHandler');

router.get('/check-for-new-photos', checkForNewPhotosController.checkForNewPhotos, errorHandler);

module.exports = router;