import axios, { AxiosResponse, AxiosError } from 'axios';
import Response from './typings/Response';

export default class Requests {
  get = async (url: string): Promise<Response> => {
    const promiseResponse = axios.get(url).then(
      accept => {
        return this.makeAcceptResponse(accept);
      },
      reject => {
        return this.makeRejectResponse(reject);
      }
    );
    return promiseResponse;
  };

  post = async (url: string, data: object): Promise<Response> => {
    const promiseResponse = axios.post(url, data).then(
      accept => {
        return this.makeAcceptResponse(accept);
      },
      reject => {
        return this.makeRejectResponse(reject);
      }
    );
    return promiseResponse;
  };

  all = async (promises: {
    [key: string]: Promise<Response>;
  }): Promise<{ [key: string]: Response }> => {
    const responses = axios
      .all(Object.values(promises))
      .then(
        axios.spread((...args) => {
          let responses: { [key: string]: Response } = {};
          Object.keys(promises).forEach((element, idx) => {
            responses[element] = args[idx];
          });
          return responses;
        })
      )
      .catch(error => {
        return { Error: this.makeRejectResponse(error) };
      });
    return responses;
  };

  private makeAcceptResponse = (response: AxiosResponse): Response => {
    return {
      data: response.data.json,
      status: response.status,
      statusText: response.statusText,
    };
  };

  private makeRejectResponse = (error: AxiosError): Response => {
    return {
      data: error,
      status: error.response.status,
      statusText: error.response.statusText,
    };
  };
}
