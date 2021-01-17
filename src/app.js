const express = require('express');

const app = express();

const readerControllers = require('./controllers/readers');

app.use(express.json());

// Reader section

app.post('/readers', readerControllers.create);

app.get('/readers', readerControllers.list);

app.get('/readers/:readerId', readerControllers.getReaderById);

app.patch('/readers/:id', readerControllers.updatedReader);

app.delete('/readers/:id', readerControllers.deletedReader);


module.exports = app;