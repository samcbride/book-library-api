const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");
const { Book } = require("../src/models");

describe('/books', () => {
    before(async () => Book.sequelize.sync());

    describe('with no records in the database', () => {
        describe('POST /books', () => {
            it('creates a new book in the database', async () => {
                const response = await request(app).post('/books').send({
                    title: 'A Walk in the Woods',
                    author: 'Bill Bryson',
                    genre: 'Travel Writing',
                    ISBN: '34-58603-193842',
                });
                const newBookRecord = await Book.findByPk(response.body.id, {
                    raw: true,
                });

                expect(response.status).to.equal(201);
                expect(response.body.title).to.equal('A Walk in the Woods');
                expect(newBookRecord.title).to.equal('A Walk in the Woods');
                expect(newBookRecord.author).to.equal('Bill Bryson');
                expect(newBookRecord.genre).to.equal('Travel Writing');
                expect(newBookRecord.ISBN).to.equal('34-58603-193842');
            });
            it('returns a 400 if the title value is null', async () => {
                request(app)
                .post('/books')
                .send({
                    author: 'Bill Bryson',
                    genre: 'Travel Writing',
                    ISBN: '34-58603-193842',
                })
                .then((res) => {
                  expect(res.status).to.equal(400);
                  expect(res.body.error).to.equal('The title field cannot be null.');
                })
                .catch(error => done(error));
              });
              it('returns a 400 if the author value is null', async () => {
                request(app)
                .post('/readers')
                .send({
                    title: 'A Walk in the Woods',
                    genre: 'Travel Writing',
                    ISBN: '34-58603-193842',
                })
                .then((res) => {
                  expect(res.status).to.equal(400);
                  expect(res.body.error).to.equal('The author field cannot be null.');
                })
                .catch(error => done(error));
              });
              it('returns a 400 if the genre value is null', async () => {
                request(app)
                .post('/readers')
                .send({
                    title: 'A Walk in the Woods',
                    author: 'Bill Bryson',
                    ISBN: '34-58603-193842',
                })
                .then((res) => {
                  expect(res.status).to.equal(400);
                  expect(res.body.error).to.equal('The genre field cannot be null.');
                })
                .catch(error => done(error));
              });
              it('returns a 400 if the ISBN value is null', async () => {
                request(app)
                .post('/readers')
                .send({
                    title: 'A Walk in the Woods',
                    author: 'Bill Bryson',
                    genre: 'Travel Writing',
                })
                .then((res) => {
                  expect(res.status).to.equal(400);
                  expect(res.body.error).to.equal('The ISBN field cannot be null.');
                })
                .catch(error => done(error));
              });
        });
    });

    describe('with records in the database', () => {
        let books;

        beforeEach(async () => {
            await Book.destroy({ where: {} });

            books = await Promise.all([
                Book.create({
                    title: 'A Walk in the Woods',
                    author: 'Bill Bryson',
                    genre: 'Travel Writing',
                    ISBN: '34-58603-193842',
                }),
                Book.create({
                    title: 'I Am The Messenger',
                    author: 'Marcus Zusac',
                    genre: 'Fiction',
                    ISBN: '35-33287-097382',
                }),
                Book.create({
                    title: 'The Night Circus',
                    author: 'Erin Morgenstern',
                    genre: 'Fantasy',
                    ISBN: '57-29748-117205',
                }),
            ]);
        });

        describe('GET /books', () => {
            it('gets all books records', async () => {
                const response = await request(app).get('/books');

                expect(response.status).to.equal(200);
                expect(response.body.length).to.equal(3);

                response.body.forEach((book) => {
                    const expected = books.find((a) => a.id === book.id); // Need to understand this better

                    expect(book.title).to.equal(expected.title);
                    expect(book.author).to.equal(expected.author);
                    expect(book.genre).to.equal(expected.genre);
                    expect(book.ISBN).to.equal(expected.ISBN);
                });
            });
        });

        describe('GET /books/:id', () => {
            it('gets books record by id', async () => {
                const book = books[0];
                const response = await request(app).get(`/books/${book.id}`);

                expect(response.status).to.equal(200);
                expect(response.body.title).to.equal(book.title);
                expect(response.body.author).to.equal(book.author);
                expect(response.body.genre).to.equal(book.genre);
                expect(response.body.isbn).to.equal(book.isbn);
            });

            it('returns a 404 if the book does not exist', async () => {
                const response = await request(app).get('/books/12345');

                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The book could not be found.');
            });
        });

        describe('PATCH /books/:id', () => {
            it('updates books title by id', async () => {
                const book = books[0];
                const response = await request(app)
                  .patch(`/books/${book.id}`)
                  .send({ title: 'The Whispering Wood' });
                const updatedBookRecord = await Book.findByPk(book.id, {
                    raw: true,
                });

                expect(response.status).to.equal(200);
                expect(updatedBookRecord.title).to.equal('The Whispering Wood');
            });

            it('updates books author by id', async () => {
                const book = books[0];
                const response = await request(app)
                  .patch(`/books/${book.id}`)
                  .send({ author: 'Billy Bishop' });
                const updatedBookRecord = await Book.findByPk(book.id, {
                    raw: true,
                });

                expect(response.status).to.equal(200);
                expect(updatedBookRecord.author).to.equal('Billy Bishop');
            });

            it('updates books genre by id', async () => {
                const book = books[0];
                const response = await request(app)
                  .patch(`/books/${book.id}`)
                  .send({ genre: 'Mystery' });
                const updatedBookRecord = await Book.findByPk(book.id, {
                    raw: true,
                });

                expect(response.status).to.equal(200);
                expect(updatedBookRecord.genre).to.equal('Mystery');
            });

            it('updates books ISBN by id', async () => {
                const book = books[0];
                const response = await request(app)
                  .patch(`/books/${book.id}`)
                  .send({ ISBN: '89-33862-529173'});
                const updatedBookRecord = await Book.findByPk(book.id, {
                    raw: true,
                });

                expect(response.status).to.equal(200);
                expect(updatedBookRecord.ISBN).to.equal('89-33862-529173');
            });

            it('returns a 404 if the book does not exist', async () => {
                const response = await request(app)
                  .patch('/books/12345')
                  .send({ title: 'A Party for Three' });
                
                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The book could not be found.');
            });
        });

        describe('DELETE /books/:id', () => {
            it('deletes book record by id', async () => {
                const book = books[0];
                const response = await request(app).delete(`/books/${book.id}`);
                const deletedBook = await Book.findByPk(book.id, { raw: true });

                expect(response.status).to.equal(204);
                expect(deletedBook).to.equal(null);
            });

            it('returns a 404 if the book does not exist', async () => {
                const response = await request(app).delete('/books/12345');
                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The book could not be found.');
            });
        });
    });
});
