const Session = require('../models/Session.model');

const authMiddleware = async (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send('You are not authorised');
  }
};

module.exports = authMiddleware;
