const { Reader } = require("../models");

const createReader = (req, res) => {
    Reader.create(req.body)
        .then((reader) => res.status(201).json(reader))
        .catch((error) => console.log(error));
};

const getReader = (req, res) => {
    Reader.findAll()
        .then((list) => res.status(200).json(list))
        .catch((error) => console.log(error));
};

const getReaderById = (req, res) => {
    const { id } = req.params;
    Reader.findByPk(id)
        .then((reader) => {
            if (!reader) {
                res.status(404).json({ error: 'The reader could not be found.' });
            } else {
                res.status(200).json(reader);
            }
        })
        .catch((error) => console.log(error));
};

const updatedReader = (req, res) => {
    const { id } = req.params;
    Reader.update(req.body, { where: { id } })
        .then(([rowsUpdated]) => {
            if (!rowsUpdated) {
                res.status(404).json({ error: 'The reader could not be found.'});
            } else {
                res.status(200).json(rowsUpdated);
            }
        })
        .catch((error) => console.log(error));
};

const deletedReader = (req, res) => {
    const { id } = req.params;
    Reader
      .findByPk(id)
      .then(foundReader => {
          if(!foundReader) {
              res.status(404).json({ error: 'The reader could not be found.' });
          } else {
              Reader
                .destroy({ where: { id } })
                .then(() => {
                    res.status(204).send();
                })
          }
      })
      .catch((error) => console.log(error));
};

module.exports = {
  createReader,
  getReader,
  getReaderById,
  updatedReader,
  deletedReader
};
