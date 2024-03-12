const express = require('express');
const router = express.Router();
const imageUpload = require('../utils/imageUpload');
const authMiddleware = require('../utils/authMiddleware');
const ads = require('../controllers/ads.controller');

router.get('/ads', ads.getAll);
router.get('/ads/:id', ads.getAdById);
router.post('/ads', authMiddleware, imageUpload.single('image'), ads.addNewAd);
router.put('/ads/:id', authMiddleware, imageUpload.single('image'), ads.editAd);
router.delete('/ads/:id', authMiddleware, ads.deleteAd);
router.get('/ads/search/:searchPhrase', ads.search);

module.exports = router;
