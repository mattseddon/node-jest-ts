import { snsEndpoint, TopicArn, sqsEndpoint, sqsUrl } from '../../aws/metadata';

describe('GIVEN the production environment', () => {
  process.env.NODE_ENV = 'production';

  describe('WHEN we get the snsEndpoint', () => {
    const endpoint = snsEndpoint();
    it('THEN it is currently undefined', () => {
      expect(endpoint).toBe(undefined);
    });
  });

  describe('WHEN we get the TopicArn', () => {
    const arn = TopicArn();
    it('THEN it is currently undefined', () => {
      expect(arn).toBe(undefined);
    });
  });

  describe('WHEN we get the sqsEndpoint', () => {
    const endpoint = sqsEndpoint();
    it('THEN it is currently undefined', () => {
      expect(endpoint).toBe(undefined);
    });
  });

  describe('WHEN we get the sqsUrl', () => {
    const url = sqsUrl();
    it('THEN it is currently undefined', () => {
      expect(url).toBe(undefined);
    });
  });

  process.env.NODE_ENV = 'test';
});
