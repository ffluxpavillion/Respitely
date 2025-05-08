const mongoose = require('mongoose');

const VancouverUser = mongoose.createConnection(process.env.MONGO_DB_URI_VANCOUVER).model('users', userSchema);

module.exports = VancouverUser;