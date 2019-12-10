import Resource from '../typings/Resource';

let movies = [];

export default class Movies implements Resource {
  create(data: object) {
    movies.push(data);
    return data;
  }

  findMany() {
    return movies;
  }
}
