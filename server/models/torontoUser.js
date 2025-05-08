const mongoose = require('mongoose');

const TorontoUser = mongoose.createConnection(process.env.MONGO_DB_URI_TORONTO).model('user', userSchema);

module.exports = TorontoUser;

