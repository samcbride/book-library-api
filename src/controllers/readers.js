const { Reader } = require("../models");

const create = (req, res) => {
    Reader.create(req.body)
        .then((reader) => res.status(201).json(reader))
        .catch((error) => console.log(error));
};

const list = (req, res) => {
    Reader.findAll()
        .then((list) => res.status(200).json(list))
        .catch((error) => console.log(error));
};

const getReaderById = (req, res) => {
    const { readerId } = req.params;
    Reader.findByPk(readerId)
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
    Reader.destroy({ where: { id } })
    .then((rowsDeleted) => {
        if (!rowsDeleted) {
            res.status(404).json({ error: 'The reader could not be found.' });
        } else {
            res.status(204).json(rowsDeleted);
        }
    })
    .catch((error) => console.log(error));
};

module.exports = {
  create,
  list,
  getReaderById,
  updatedReader,
  deletedReader
};
