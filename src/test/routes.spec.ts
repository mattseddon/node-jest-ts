import * as app from '../routes';
import * as supertest from 'supertest';
const request = supertest(app);

describe('GIVEN the test endpoint', () => {
  const endpoint = '/test';
  describe('WHEN we call asynchronously', () => {
    it('THEN returns the correct response', async done => {
      const response = await request.get(endpoint);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('pass!');

      done();
    });
  });
});

describe('GIVEN two movies and the movies GET and POST endpoints', () => {
  const endpoint = '/movies';
  const originalMovie: object = {
    name: 'Jaws',
    rating: 9,
  };

  const sequelMovie: object = {
    name: 'Jaws: The Revenge',
    rating: 1.4,
  };

  describe('WHEN we POST the movie data to the endpoint', () => {
    it('THEN accepts the data', async done => {
      await request
        .post(endpoint)
        .send(originalMovie)
        .set('Accept', 'application/json')
        .expect(200);

      await request
        .post(endpoint)
        .send(sequelMovie)
        .set('Accept', 'application/json')
        .expect(200);

      done();
    });
  });

  describe('WHEN we GET the data from the endpoint', () => {
    it('THEN returns the data', async done => {
      const response = await request.get(endpoint);

      expect(response.body.length).toBe(2);
      expect(response.body).toContainEqual(originalMovie);
      expect(response.body).toContainEqual(sequelMovie);

      done();
    });
  });
});
