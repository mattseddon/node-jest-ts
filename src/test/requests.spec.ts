import Requests from '../Requests';
import axios, { AxiosResponse } from 'axios';

describe('GIVEN a url', () => {
  const url: string = 'https://httpbin.org/status/200';
  const requests = new Requests();
  describe('WHEN perform a get request', () => {
    it('THEN returns a response with a 200 status', async () => {
      const response: any = await requests.get(url);
      expect(response.status).toEqual(200);
      expect(response.statusText).toEqual('OK');
    });
  });
});

describe('GIVEN another url', () => {
  const url: string = 'https://httpbin.org/anything';
  const requests = new Requests();
  const data: object = { 'what I give': 'is', 'what I get': true };
  describe('WHEN perform a post request', () => {
    it('THEN returns a response with a 200 status and the object that was sent', async () => {
      const response: any = await requests.post(url, data);
      expect(response.status).toEqual(200);
      expect(response.data.json).toEqual(data);
      expect(response.statusText).toEqual('OK');
    });
  });
});

describe('GIVEN two urls and some data', () => {
  const url1: string = 'https://httpbin.org/status/200';
  const url2: string = 'https://httpbin.org/anything';
  const requests = new Requests();
  const data: object = { 'what I give': 'is', 'what I get': true };
  describe('WHEN perform a post and a get request', () => {
    it('THEN returns a response with a 200 status and the object that was sent', async () => {
      const responses = await axios
        .all([requests.get(url1), requests.post(url2, data)])
        .then(
          axios.spread((response1: AxiosResponse, response2: AxiosResponse) => {
            return { response1: response1, response2: response2 };
          })
        );

      expect(responses.response1.status).toEqual(200);
      expect(responses.response1.statusText).toEqual('OK');

      expect(responses.response2.status).toEqual(200);
      expect(responses.response2.data.json).toEqual(data);
      expect(responses.response2.statusText).toEqual('OK');
    });
  });
});
