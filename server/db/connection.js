const { mongoose } = require('mongoose');

const connectToDatabase = async () => {  // Connect to MongoDB
  try {
    await mongoose
      .connect(process.env.MONGODB_URI_TORONTO)
      .then(() => console.log('Connected to MongoDB - database: Respitely!'));
  } catch (error) {
    console.log('Database not connected', err);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
