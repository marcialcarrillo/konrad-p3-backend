const express = require("express");
const { customErrors } = require("../helpers/errors.helper");
const {
  getAuthors,
  getAuthor,
  addAuthor,
  updateAuthor,
  removeAuthor,
} = require("../services/authors.service");
const authorRouter = express.Router();
authorRouter.use(express.json());

authorRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const authors = await getAuthors();
      res.send(authors);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    // console.log("request: ", req.headers.authorization);
    try {
      const authorAdded = await addAuthor(req.body);
      res.status(201).send(authorAdded);
    } catch (err) {
      next(err);
    }
  });

authorRouter
  .route("/:authorsId")
  //check for the id first and return and error if there isn't a match
  .all(async (req, res, next) => {
    try {
      const id = req.params.authorsId;
      const author = await getAuthor(id);
      !author && next(customErrors.idError);
      next();
    } catch (err) {
      next(err);
    }
  })
  .get(async (req, res, next) => {
    const id = req.params.authorsId;
    try {
      const author = await getAuthor(id);
      res.send(author);
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    const id = req.params.authorsId;
    try {
      const authorUpdated = await updateAuthor(req.params.authorsId, req.body);
      res.send(authorUpdated);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const id = req.params.authorsId;
      const authorDeleted = await removeAuthor(id);
      res.send(authorDeleted);
    } catch (err) {
      next(err);
    }
  });

module.exports = authorRouter;
