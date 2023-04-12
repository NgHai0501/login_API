const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const User = new Schema({
    account: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    }
  });

User.plugin(uniqueValidator);
module.exports = mongoose.model('User', User);