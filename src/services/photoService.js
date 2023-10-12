const awsS3Service = require('./awsS3Service');
const awsRekognitionService = require('./awsRekognitionService');
const Photo = require('../models/photo');

const uploadPhoto = async (photo, photographerId) => {
  try {
    const uploadResult = await awsS3Service.uploadPhoto(photo);
    const indexResult = await awsRekognitionService.indexFaces(uploadResult.Location, photographerId);
    const photoRecord = await Photo.create({
      url: uploadResult.Location,
      photographerId,
      indexedFaces: indexResult.FaceRecords.map(record => record.Face.FaceId)
    });
    return photoRecord;
  } catch (error) {
    throw error;
  }
};

const getPhotosByFaceId = async (faceId) => {
  try {
    const photos = await Photo.findAll({
      where: {
        indexedFaces: {
          $contains: [faceId]
        }
      },
      order: [['createdAt', 'DESC']]
    });
    return photos;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploadPhoto,
  getPhotosByFaceId
};