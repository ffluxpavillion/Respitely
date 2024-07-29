const mongoose = require('mongoose');

const VancouverUser = mongoose.createConnection(process.env.MONGO_DB_URI_VANCOUVER).model('User', userSchema);

module.exports = VancouverUser;