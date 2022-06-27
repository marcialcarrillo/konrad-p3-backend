const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },

  publishedAt: { type: Date },
});

module.exports = bookSchema;
