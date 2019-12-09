import Resource from '../typings/Resource';

let movies = [];

export default class MoviesApi implements Resource {
  create(data: object) {
    movies.push(data);
    return data;
  }

  findMany() {
    return movies;
  }
}
