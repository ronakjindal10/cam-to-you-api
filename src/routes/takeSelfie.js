const express = require('express');
const router = express.Router();
const selfieUpload = require('../middlewares/selfieUpload');
const takeSelfieController = require('../controllers/takeSelfieController');
const errorHandler = require('../middlewares/errorHandler');

router.post('/take-selfie', selfieUpload.single('selfie'), takeSelfieController.takeSelfie, errorHandler);

module.exports = router;