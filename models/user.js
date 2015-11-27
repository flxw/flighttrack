var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  picture: Buffer,
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }]
});

// methods ======================
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  //return bcrypt.compareSync(password, this.local.password);
  return password === this.password
};

module.exports = mongoose.model('User', userSchema);