import Resource from '../../typings/Resource';
import MoviesApi from '../../api/MoviesApi';

describe('GIVEN the Movies API and two movies', () => {
  const moviesApi: Resource = new MoviesApi();

  const originalMovie: object = {
    name: 'Jaws',
    rating: 9,
  };

  const sequelMovie: object = {
    name: 'Jaws: The Revenge',
    rating: 1.4,
  };

  describe('WHEN we create a classic original movie', () => {
    const movie: object = moviesApi.create(originalMovie);
    it('THEN returns an object', () => {
      expect(movie).toEqual(originalMovie);
    });
  });

  describe('WHEN we create an awful sequel to cash in', () => {
    const movie: object = moviesApi.create(sequelMovie);
    it('THEN returns an object', () => {
      expect(movie).toEqual(sequelMovie);
    });
  });

  describe('WHEN we try to find all the movies', () => {
    const movies: object = moviesApi.findMany();
    it('THEN returns all of the objects in a list', () => {
      expect(movies).toEqual([originalMovie, sequelMovie]);
    });
  });
});
