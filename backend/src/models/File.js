const mongoose = require('mongoose');

const File = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
}, 
{
  timestamps: true, 
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

File.virtual('url').get(function() {
  const baseUrl = process.env.APP_URL || 'http://localhost:3000'; // Use environment variable or default to localhost
  return `${baseUrl}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model('File', File);