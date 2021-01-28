const { Book, Reader } = require('../models');

const createBook = (req, res) => {
    Book.create(req.body)
        .then((book) => res.status(201).json(book))
        .catch((error) => console.log(error));
};

const getBooks = (req, res) => {
    Book.findAll()
      .then((list) => res.status(200).json(list))
      .catch((error) => console.log(error));
};

const getBookById = (req, res) => {
    const { id } = req.params;
    Book.findByPk(id)
      .then((book) => {
          if(!book) {
              res.status(404).json({ error: 'The book could not be found.' });
          } else {
              res.status(200).json(book);
          }
      })
      .catch((error) => console.log(error));
};

const updatedBook = (req, res) => {
   const { id } = req.params;
   Book.update(req.body, { where: { id } })
     .then(([rowsUpdated]) => {
         if(!rowsUpdated) {
             res.status(404).json({ error: 'The book could not be found.' });
         } else {
             res.status(200).json(rowsUpdated);
         }
     }) 
     .catch((error) => console.log(error));
};

const deletedBook = (req, res) => {
    const { id } = req.params;
    Book
      .findByPk(id)
      .then(foundBook => {
          if(!foundBook) {
              res.status(404).json({ error: 'The book could not be found.' });
          } else {
              Book
                .destroy({ where: { id } })
                .then(() => {
                    res.status(204).send();
                })
          }
      })
      .catch((error) => console.log(error));
};



module.exports = {
    createBook,
    getBooks,
    getBookById,
    updatedBook,
    deletedBook
};