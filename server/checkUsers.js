const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const users = await User.find();
    console.log('Users in DB:', users);
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
