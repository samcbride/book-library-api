const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");
const { Reader } = require("../src/models");

describe("/readers", () => {
  before(async () => {
    try {
      await Reader.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Reader.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });

  describe("POST /readers", async () => {
    it("creates a new reader in the database", async () => {
      const response = await request(app).post("/readers").send({
        name: "Beverley James",
        email: "beverleyjames@iamanemail.com",
      });

      await expect(response.status).to.equal(201);

      expect(response.body.name).to.equal("Beverley James");

      const insertedReaderRecords = await Reader.findByPk(response.body.id, {
        raw: true,
      });
      expect(insertedReaderRecords.name).to.equal("Beverley James");
      expect(insertedReaderRecords.email).to.equal(
        "beverleyjames@iamanemail.com"
      );
    });
    done(); // Is this needed?
  });

  describe("with readers in the database", () => {
    let readers;
    beforeEach((done) => {
      Promise.all([
        Reader.create({
          name: 'Beverley James',
          email: 'beverleyjames@iamanemail.com'
        }),
        Reader.create({
          name: 'Audrey Wellington',
          email: 'audreywellington@iamanemail.com'
        }),
        Reader.create({
          name: 'Iris Findlay',
          email: 'irisfindlay@iamanemail.com'
        }),
      ]).then((documents) => {
        readers = documents;
        done();
      });
    });

    describe("GET /readers", () => {
      it("gets all reader records", (done) => {
        request(app)
          .get("/readers")
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(3);
            res.body.forEach((reader) => {
              const expected = readers.find((a) => a.id === reader.id);
              expect(reader.name).to.equal(expected.name);
              expect(reader.email).to.equal(expected.email);
            });
            done();
          })
          .catch((error) => done(error));
      });
    });

    describe("GET /readers/:readerId", () => {
      it("gets reader record by id", (done) => {
        const reader = readers[0];
        request(app)
          .get(`/readers/${reader.id}`)
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(reader.name);
            expect(res.body.email).to.equal(reader.email);
            done();
          })
          .catch((error) => done(error));
      });

      it("returns a 404 if the reader does not exist", (done) => {
        request(app)
          .get("/readers/12345")
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The reader could not be found.');
            done();
          })
          .catch(error => done(error));
      });
    });

    describe('PATCH /readers/:id', () => {
      it('updates reader name by id', (done) => {
        const reader = readers[0];
        request(app)
        .patch(`/readers/${reader.id}`) // We are patching via this route
        .send({ name: 'Beverley Tolly' }) // This is the new information that we are sending
        .then((res) => { // All of this will then be put into the res placeholder variable
          expect(res.status).to.equal(200); // We expect the status of the request to be 200 (it has been approved)
          Reader.findByPk(reader.id, { raw: true}).then((readerUpdated) => { // We're looking for the Reader by PK (feeding in the reader.id), then that info is being put in a placeholder variable (updatedReader)
            expect(readerUpdated.name).to.equal('Beverley Tolly'); // We expect updatedReader.name to be equal to the value we sent up above
            done();
          })
          .catch(error => done(error));
        });
      });
      it('updates reader email by id', (done) => {
        const reader = readers[0];
        request(app)
        .patch(`/readers/${reader.id}`)
        .send({ email: 'beverleytolly@iamanemail.com' })
        .then((res) => {
          expect(res.status).to.equal(200);
          Reader.findByPk(reader.id, { raw: true }).then((readerUpdated) => {
            expect(readerUpdated.email).to.equal('beverleytolly@iamanemail.com');
            done();
          })
          .catch(error => done(error));
        });
      });
      it('returns a 404 if the reader does not exist', (done) => {
        request(app)
        .get('/readers/12345')
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The reader could not be found.');
          done();
        })
        .catch(error => done(error));
      });
    });
    
    describe('DELETE /readers/:readerId', () => {
      it('deletes reader record by id', (done) => {
        const reader = readers[0];
        request(app)
        .delete(`/readers/${reader.id}`)
        .then((res) => {
          expect(res.status).to.equal(204);
          Reader.findByPk(reader.id, { raw: true }).then((readerDeleted) => {
            expect(readerDeleted).to.equal(null);
            done();
          })
          .catch(error => done(error));
        });
      });
      it('returns a 404 if the reader does not exist', (done) => {
        request(app)
        .get('/readers/12345') // Why is this a .get and not .delete?
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The reader could not be found.');
          done();
        })
        .catch(error => done(error));
      });
    });
  });
});
