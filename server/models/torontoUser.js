const mongoose = require('mongoose');

const TorontoUser = mongoose.createConnection(process.env.MONGO_DB_URI_TORONTO).model('User', userSchema);

module.exports = TorontoUser;

