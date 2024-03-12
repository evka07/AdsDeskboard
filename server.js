const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToDB = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// connect to db
connectToDB();

const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000', 'http://localhost:8000'],
      credentials: true,
    })
  );
}
// Middleware
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create(mongoose.connection),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

app.use(helmet());

app.use('/api', adsRoutes);
app.use('/api/auth', authRoutes);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});
