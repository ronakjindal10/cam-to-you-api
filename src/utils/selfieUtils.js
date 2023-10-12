const fs = require('fs');
const path = require('path');

const validateSelfieFormat = (file) => {
  const validFormats = ['jpg', 'jpeg', 'png'];
  const ext = path.extname(file.originalname).toLowerCase().substring(1);
  if (!validFormats.includes(ext)) {
    throw new Error('Invalid file format. Only jpg, jpeg and png are allowed.');
  }
};

const deleteTempSelfie = (file) => {
  fs.unlinkSync(file.path);
};

module.exports = {
  validateSelfieFormat,
  deleteTempSelfie,
};