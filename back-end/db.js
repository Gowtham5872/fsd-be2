const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://gowtham:GowtH5872%4001@cluster0.gvlvfma.mongodb.net/nodeday3';

mongoose.connect(mongoDB).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;