const mongoose = require('mongoose');

const side = new mongoose.Schema({
  name: String,
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('Side', side);