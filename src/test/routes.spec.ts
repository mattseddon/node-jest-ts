import * as app from '../routes';
import * as supertest from 'supertest';
const request = supertest(app);

describe('GIVEN the test endpoint', () => {
  const endpoint = '/test';
  describe('WHEN we call asynchronously', () => {
    it('THEN the correct response is returned', async () => {
      const response = await request.get(endpoint);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('pass!');
    });
  });
});

describe('GIVEN two movies and the movies GET and POST endpoints', () => {
  const endpoint = '/movies';
  const originalMovie: object = {
    name: 'Speed',
    rating: 7.6,
  };

  const sequelMovie: object = {
    name: 'Speed 2: Cruise Control',
    rating: 1.6,
  };

  describe('WHEN we POST the movie data to the endpoint', () => {
    it('THEN the data is accepted', async () => {
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
    });
  });

  describe('WHEN we GET the data from the endpoint', () => {
    it('THEN the data is returned', async () => {
      const response = await request.get(endpoint);

      expect(response.body.length).toBe(2);
      expect(response.body).toContainEqual(originalMovie);
      expect(response.body).toContainEqual(sequelMovie);
    });
  });
});
