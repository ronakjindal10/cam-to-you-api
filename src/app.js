const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');

// Import routes
const uploadPhotoRoute = require('./routes/uploadPhoto');
const takeSelfieRoute = require('./routes/takeSelfie');
const getMyPhotosRoute = require('./routes/getMyPhotos');
const checkForNewPhotosRoute = require('./routes/checkForNewPhotos');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/upload-photo', uploadPhotoRoute);
app.use('/take-selfie', takeSelfieRoute);
app.use('/get-my-photos', getMyPhotosRoute);
app.use('/check-for-new-photos', checkForNewPhotosRoute);

// Error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;