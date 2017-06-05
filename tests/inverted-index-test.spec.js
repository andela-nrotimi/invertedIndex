import supertest from 'supertest';
import app from '../server';
import books from '../fixtures/books.json';
import empty from '../fixtures/empty.json';

const request = supertest(app);

describe('Read Book Data', () => {
  describe('Read json file content', () => {
    it('should ensure that json file is not be empty', () => {
      expect(books.length).toBeGreaterThan(0);
      expect(empty.length).toEqual(0);
    });
  });
  describe('Json file should have', () => {
    it('title and texts keys', () => {
      expect(Object.keys(books[0])).toEqual(['title', 'text']);
      expect(Object.keys(empty)).not.toEqual(['title', 'text']);
    });
  });
  describe('rejects an invalid file', () => {

  });
});

describe('Hello World Server', () => {
  it('returns status code 200', (done) => {
    request.get('/')
      .end((error, response) => {
        expect(response.status).toEqual(200);
        // expect(response.body).toEqual('Hello World');
        done();
      });
  });
});


