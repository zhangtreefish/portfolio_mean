let mongoose = require('mongoose');

module.exports = function(goose_for_db) {
  let projectSchema = {
    id: { type: String, required: [true, 'why no id?'] },
    genre: { type: String, enum: ['full stack', 'front-end', 'back-end'], required: [true, 'why no genre?']},
    title: { type: String, required: [true, 'why no title?']},
    year_start: { type: Number, required: [true, 'why no year_start?']},
    year_end: { type: Number },
    description: { type: String, required: [true, 'why no description?']},
    tools: [String],
    image: { type: String, match: /^http:\/\//i },
    url: { type: String, match: /^https:\/\//i },
    code: { type: String, match: /^https:\/\//i }
  };

  let schema = new mongoose.Schema(projectSchema);
  schema.index({ tools: 'text' });

  // schema.set('toObject', { virtuals: true });
  // schema.set('toJSON', { virtuals: true });

  return goose_for_db.model('Project', schema, 'projects');
};
