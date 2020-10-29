const mongoose = require('mongoose');

const comment = new mongoose.Schema({
  content: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model('Comment', comment);