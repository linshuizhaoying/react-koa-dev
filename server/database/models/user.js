const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // 可以考虑加密
  email: { type: String, default:'' },
  signupDate: { type: Date, default: Date.now() }
});

UserSchema.methods.findByName = function(username){  
  const user = this.find({ 'username': username.toLowerCase() }).exec();
  return user
};

module.exports = mongoose.model('User', UserSchema);
