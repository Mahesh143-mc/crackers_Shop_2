const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

console.log('Testing connection to:', process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Success! Your connection string is correct.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Connection Failed!');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    process.exit(1);
  });
