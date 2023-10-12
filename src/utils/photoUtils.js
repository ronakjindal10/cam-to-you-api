```javascript
const fs = require('fs');
const path = require('path');

const isValidImage = (file) => {
    const validExtensions = ['.jpg', '.jpeg', '.png'];
    const extension = path.extname(file.originalname).toLowerCase();
    return validExtensions.includes(extension);
};

const isPartialUpload = (file) => {
    try {
        const stats = fs.statSync(file.path);
        return stats.size !== file.size;
    } catch (error) {
        return true;
    }
};

const getRecommendedFormat = () => {
    // AWS Rekognition recommends JPEG or PNG format for best results
    return '.jpeg';
};

module.exports = {
    isValidImage,
    isPartialUpload,
    getRecommendedFormat
};
```