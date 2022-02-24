  const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {}, (error) => {
    if (error) throw error;

    console.log('Connected to database !');
});