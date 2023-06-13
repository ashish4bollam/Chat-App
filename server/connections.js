const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb+srv://user:admin@cluster0.knahwro.mongodb.net/?retryWrites=true&w=majority'  
  
).then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });