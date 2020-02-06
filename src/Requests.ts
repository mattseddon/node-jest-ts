import axios, { AxiosResponse, AxiosError } from 'axios';
import { Response, PromiseResponses, Responses } from './typings/Response';

export default class Requests {
  get = async (url: string): Promise<Response> => {
    const promiseResponse = axios.get(url).then(
      resolve => {
        return this.makeResolveResponse(resolve);
      },
      reject => {
        return this.makeRejectResponse(reject);
      }
    );
    return promiseResponse;
  };

  post = async (url: string, data: object): Promise<Response> => {
    const promiseResponse = axios.post(url, data).then(
      resolve => {
        return this.makeResolveResponse(resolve);
      },
      reject => {
        return this.makeRejectResponse(reject);
      }
    );
    return promiseResponse;
  };

  all = async (promises: PromiseResponses): Promise<Responses> => {
    const responses = axios
      .all(Object.values(promises))
      .then(
        axios.spread((...args) => {
          let responses: Responses = {};
          Object.keys(promises).forEach((key, idx) => {
            responses[key] = args[idx];
          });
          return responses;
        })
      )
      .catch(error => {
        return { Error: this.makeRejectResponse(error) };
      });
    return responses;
  };

  private makeResolveResponse = (response: AxiosResponse): Response => {
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
