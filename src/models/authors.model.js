const mongoose = require("mongoose");
const bookSchema = require("./books.model");

const authorSchema = new mongoose.Schema({
  fullName: { type: String, minlength: 3, required: true },
  birthday: { type: Date },
  books: [bookSchema],
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
