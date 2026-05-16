const mongoose = require('mongoose');
const Category = require('./models/Category');
const dotenv = require('dotenv');

dotenv.config();

const categories = [
  { name: 'Sparklers', description: 'Handheld firecrackers that emit sparks' },
  { name: 'Rockets', description: 'Firecrackers that fly into the sky' },
  { name: 'Gift Boxes', description: 'Assorted collections of crackers' },
  { name: 'Fancy Crackers', description: 'Special visual and sound effects' },
  { name: 'Kids Crackers', description: 'Safe and fun crackers for children' }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Category.deleteMany();
    await Category.insertMany(categories);
    console.log('Categories seeded successfully');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
