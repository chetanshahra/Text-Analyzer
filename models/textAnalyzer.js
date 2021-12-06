const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const textAnalyzerSchema = new Schema({
  text: { type: String, required: true },
  wordCount: { type: Number, required: true },
  charCount: { type: Number, required: true },
  timeToRead: { type: Number, required: true },
}, {
  timestamps: true,
});

const TextAnalyzer = mongoose.model('TextAnalyzer', textAnalyzerSchema);

module.exports = TextAnalyzer;