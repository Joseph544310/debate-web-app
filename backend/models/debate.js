const mongoose = require('mongoose');

const debate = new mongoose.Schema({
  title: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  sides: [      
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Side"
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model('Debate', debate);