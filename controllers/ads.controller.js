const User = require('../models/User.model');
const Ad = require('../models/Ad.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');
const util = require('util');
const unlinkAsync = util.promisify(fs.unlink);

exports.getAll = async (req, res) => {
  try {
    const ads = await Ad.find().populate('user');
    res.json(ads);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: error.message });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate('user');
    if (!ad) {
      res.status(404).json({ message: 'Ad Not Found' });
    } else res.json(ad);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};

exports.addNewAd = async (req, res) => {
  try {
    const { title, content, date, price, location, user } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (
      title &&
      content &&
      date &&
      price &&
      location &&
      user &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(fileType)
    ) {
      const userFromDB = await User.findOne({ login: user });

      const newAd = await Ad.create({
        title,
        content,
        date,
        image: req.file.filename,
        price,
        location,
        user: userFromDB._id,
      });
      res.json(newAd);
    } else {
      if (req.file) {
        unlinkAsync(req.file.path);
        res.status(400).send({ message: 'Bad request' });
      }
    }
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      res.status(404).json({ message: 'Ad Not Found' });
    }
    await Ad.deleteOne({ _id: req.params.id });
    res.json({ message: 'Ad deleted successfully' });
    if (ad.image) {
      unlinkAsync(`./public/uploads/${ad.image}`);
    }
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: error.message });
  }
};

exports.editAd = async (req, res) => {
  const { title, location, content, price, date } = req.body;
  const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

  try {
    const ad = await Ad.findOne({ _id: req.params.id });
    const user = await User.findOne({ login: req.session.user.login });

    if (!ad || (ad.user.toString() !== user._id.toString() && !req.file)) {
      return res
        .status(400)
        .json({ error: 'BadRequest', message: 'Invalid request!' });
    }

    if (title && location && content && price && date) {
      let newAd = {};

      newAd = await Ad.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            title,
            location,
            content,
            price,
            date,
            image:
              req.file &&
              ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
                ? req.file.filename
                : ad.image,
            user,
          },
        },
        { new: true }
      );
      if (req.file) {
        await unlinkAsync(`./public/uploads/${ad.image}`);
      }

      if (newAd) {
        return res
          .status(200)
          .json({ success: true, message: 'Ad updated', modifiedAd: newAd });
      }

      return res
        .status(404)
        .json({ error: 'NotFound', message: 'Ad not found!' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
};

exports.search = async (req, res) => {
  try {
    const ads = await Ad.find({
      title: new RegExp(req.params.searchPhrase, 'i'),
    });
    res.json(ads);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: error.message });
  }
};
