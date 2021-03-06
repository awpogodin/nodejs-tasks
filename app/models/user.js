// load the things we need
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// define the schema for our user model
const userSchema = new mongoose.Schema({
  local: {
    name: String,
    email: String,
    admin: { type: Boolean, default: false },
    superadmin: { type: Boolean, default: false },
    password: String,
  },
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
