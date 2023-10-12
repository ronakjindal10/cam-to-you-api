const express = require('express');
const router = express.Router();
const getMyPhotosController = require('../controllers/getMyPhotosController');
const errorHandler = require('../middlewares/errorHandler');

router.get('/get-my-photos', errorHandler(getMyPhotosController.getMyPhotos));

module.exports = router;