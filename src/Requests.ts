import axios from 'axios';

export default class Requests {
  get = async (url: string) => {
    return axios.get(url).then(
      response => {
        return response;
      },
      error => {
        console.log(error);
      }
    );
  };

  post = async (url: string, data: object) => {
    return axios.post(url, data).then(
      response => {
        return response;
      },
      error => {
        console.log(error);
      }
    );
  };
}
