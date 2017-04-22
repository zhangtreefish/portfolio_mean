var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  profile: {
    username: {
      type: String,
      required: true,
      lowercase: true
    },
    picture: {
      type: String,
      required: true,
      match: /^http:\/\//i
    }
  },
  data: {
    oauth: { type: String, required: true },
    portfolio: [ {
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
      }
    }]
  }
});

module.exports.set('toObject', { virtuals: true });
module.exports.set('toJSON', { virtuals: true });
