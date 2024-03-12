const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = () => {
  mongoose.connect(
    `mongodb+srv://threeways:${process.env.SECRET_DB}@cluster1.fzf2cia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = connectToDB;
