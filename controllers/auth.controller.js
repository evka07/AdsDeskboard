const User = require('../models/User.model');
const Session = require('../models/Session.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');
const util = require('util');
const unlinkAsync = util.promisify(fs.unlink);

exports.register = async (req, res) => {
  try {
    const { login, password, phone } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string' &&
      phone &&
      typeof phone === 'string' &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      const userWithLogin = await User.findOne({ login });
      const userWithphone = await User.findOne({ phone });
      if (userWithLogin) {
        if (req.file) {
          await unlinkAsync(req.file.path);
        }
        return res
          .status(409)
          .send({ message: 'User with this login already exists' });
      } else if (userWithphone) {
        if (req.file) {
          await unlinkAsync(req.file.path);
        }
        return res
          .status(409)
          .send({ message: 'User with this phone number already exists' });
      }

      const user = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        avatar: req.file.filename,
        phone,
      });
      res.status(202).send({ message: 'User created ' + user.login });
    } else {
      if (req.file) {
        await unlinkAsync(req.file.path);
      }
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string'
    ) {
      const user = await User.findOne({ login });
      if (!user) {
        res.status(400).send({ message: 'Login or password are incorrect' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = {
            id: user._id,
            login: user.login,
          };
          res.status(200).json({
            message: 'Login successfully',
            login: user.login,
            id: user._id,
          });
        } else {
          res.status(400).send({ message: 'Login or password are incorrect' });
        }
      }
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  res.send({ message: req.session.user });
};

exports.logout = async (req, res) => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await Session.deleteMany({});
      res.send({ message: 'You have logged out' });
    } else {
      req.session.destroy();
      res.send('You have logged out!');
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
