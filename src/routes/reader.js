const express = require('express');

const router = express.Router();

const readerController = require('../controllers/readers');

router
  .route('/')
  .get(readerController.getReader)
  .post(readerController.createReader);

router
  .route('/:id')
  .get(readerController.getReaderById)
  .patch(readerController.updatedReader)
  .delete(readerController.deletedReader);
  
  module.exports = router;
