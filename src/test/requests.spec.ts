import Requests from '../Requests';
import Response from '../typings/Response';

describe('GIVEN a url', () => {
  const url: string = 'https://httpbin.org/status/200';
  const requests = new Requests();
  describe('WHEN we perform a get request', () => {
    it('THEN returns a response with a 200 status', async () => {
      const response: Response = await requests.get(url);
      expect(response.status).toEqual(200);
      expect(response.statusText).toEqual('OK');
    });
  });
});

describe('GIVEN a url', () => {
  const url: string = 'https://httpbin.org/status/500';
  const requests = new Requests();
  describe('WHEN we perform a get request', () => {
    it('THEN returns a response with a 500 status', async () => {
      const response: Response = await requests.get(url);
      expect(response.status).toEqual(500);
      expect(response.statusText).toEqual('INTERNAL SERVER ERROR');
      expect(response.data).toEqual(
        Error('Request failed with status code 500')
      );
    });
  });
});

describe('GIVEN another url', () => {
  const url: string = 'https://httpbin.org/anything';
  const requests = new Requests();
  const data: object = { 'what I give': 'is', 'what I get': true };
  describe('WHEN we perform a post request', () => {
    it('THEN returns a response with a 200 status and the object that was sent', async () => {
      const response: Response = await requests.post(url, data);
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(data);
      expect(response.statusText).toEqual('OK');
    });
  });
});

describe('GIVEN two urls and some data', () => {
  const getUrl: string = 'https://httpbin.org/status/200';
  const postUrl: string = 'https://httpbin.org/anything';
  const requests = new Requests();
  const data: object = { 'what I give': 'is', 'what I get': true };
  const promises = {
    get: requests.get(getUrl),
    post: requests.post(postUrl, data),
  };
  describe('WHEN we perform all of the requests asynchronously', () => {
    it('THEN returns an object of responses with the expected values', async () => {
      const responses: { get: Response; post: Response } = await requests.all(
        promises
      );

      expect(responses.get.status).toEqual(200);
      expect(responses.get.statusText).toEqual('OK');

      expect(responses.post.status).toEqual(200);
      expect(responses.post.data).toEqual(data);
      expect(responses.post.statusText).toEqual('OK');
    });
  });
});

describe('GIVEN three urls and some data', () => {
  const get500Url: string = 'https://httpbin.org/status/500';
  const get200Url: string = 'https://httpbin.org/status/200';
  const postUrl: string = 'https://httpbin.org/anything';
  const requests = new Requests();
  const data: object = { 'what I give': 'is', 'what I get': true };
  const promises = {
    get500: requests.get(get500Url),
    get200: requests.get(get200Url),
    post: requests.post(postUrl, data),
  };
  describe('WHEN we perform all of the requests asynchronously', () => {
    it('THEN returns an object of responses with the expected values', async () => {
      const responses: {
        get500: Response;
        get200: Response;
        post: Response;
      } = await requests.all(promises);

      expect(responses.get500.status).toEqual(500);
      expect(responses.get500.statusText).toEqual('INTERNAL SERVER ERROR');
      expect(responses.get500.data).toEqual(
        Error('Request failed with status code 500')
      );

      expect(responses.get200.status).toEqual(200);
      expect(responses.get200.statusText).toEqual('OK');

      expect(responses.post.status).toEqual(200);
      expect(responses.post.data).toEqual(data);
      expect(responses.post.statusText).toEqual('OK');
    });
  });
});
