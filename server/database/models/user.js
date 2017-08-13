const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // 可以考虑加密
  email: { type: String },
  signupDate: { type: Date, default: Date.now() }
});

UserSchema.pre('save', (next) => {
  this.signupDate = Date.now();
  next();
});


UserSchema.statics.findUser = function*(username, password) {  
  const user = yield this.findOne({ 'username': username.toLowerCase() }).exec();
  if (!user) throw new Error('User not found');

};

module.exports = mongoose.model('User', UserSchema);
