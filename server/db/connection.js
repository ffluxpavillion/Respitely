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

// const mongoose = require('mongoose');

// const connections = {};

// const connectToDatabase = async () => {
//   const dbUris = {
//     toronto: process.env.MONGODB_URI_TORONTO,
//     vancouver: process.env.MONGODB_URI_VANCOUVER,
//     // mississauga: process.env.MONGODB_URI_MISSISSAUGA, // hypothetical for the future
//     // montreal: process.env.MONGODB_URI_MONTREAL, // hypothetical for the future
//     // ottawa: process.env.MONGODB_URI_OTTAWA // hypothetical for the future
//   };

//   for (const city in dbUris) {
//     if (dbUris[city]) {
//       try {
//         connections[city] = await mongoose.createConnection(dbUris[city], { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log(`Connected to MongoDB - database for ${city}`);
//       } catch (error) {
//         console.error(`Error connecting to MongoDB for ${city}:`, error);
//       }
//     }
//   }
// };

// module.exports = { connectToDatabase, connections };
