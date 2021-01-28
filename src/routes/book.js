const express = require('express');

const router = express.Router();
const bookController = require('../controllers/books');

router
  .route('/')
  .get(bookController.getBooks)
  .post(bookController.createBook);

router
  .route('/:id')
  .get(bookController.getBookById)
  .patch(bookController.updatedBook)
  .delete(bookController.deletedBook);

  module.exports = router;