const express = require("express");
const { isValidationError, formatError } = require("../helpers/errors.helper");
const {
  getBooks,
  getBook,
  addBook,
  updateBook,
  removeBook,
} = require("../services/books.service");
const router = express.Router();
router.use(express.json());

router.route("/").get(async (req, res, next) => {
  const books = await getBooks();
  res.send(books);
});

router
  .route("/:id")
  //check for the id first and return and error if there isn't a match
  .all(async (req, res, next) => {
    try {
      const id = req.params.authorsId;
      const book = await getBook(id);
      !book && next(customErrors.idError);
    } catch (err) {
      throw new Error(err);
    }
  })
  .get(async (req, res, next) => {
    const id = req.params.id;

    try {
      const book = await getBook(id);
      res.send(book);
    } catch (err) {
      throw new Error(err);
    }
  })
  .post(async (req, res, next) => {
    const id = req.params.id;
    try {
      const bookAdded = await addBook(id, req.body);
      res.send(bookAdded);
    } catch (err) {
      throw new Error(err);
    }
  })
  .put(async (req, res, next) => {
    const id = req.params.id;
    try {
      const bookUpdated = await updateBook(id, req.body);
      res.send(bookUpdated);
    } catch (err) {
      throw new Error(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const bookDeleted = await removeBook(req.params.id);
      !bookDeleted ? next("Id not found") : res.send(bookDeleted);
    } catch (err) {
      throw new Error(err);
    }
  });

module.exports = router;
