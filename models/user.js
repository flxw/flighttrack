var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var timestamps = require('mongoose-timestamp');

var userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  picture: Buffer,
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],
  image: {type: mongoose.Schema.Types.ObjectId, ref: 'Image', default: null},
});

// methods ======================
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
  //return password === this.password
};

userSchema.plugin(timestamps,  {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = mongoose.model('User', userSchema);