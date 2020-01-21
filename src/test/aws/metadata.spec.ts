import { snsEndpoint, TopicArn, sqsEndpoint, sqsUrl } from '../../aws/metadata';

describe('GIVEN the production environment', () => {
  process.env.NODE_ENV = 'production';

  describe('WHEN we get the snsEndpoint', () => {
    const endpoint = snsEndpoint();
    it('THEN it is currently an empty string as it is not yet implemented', () => {
      expect(endpoint).toBe('');
    });
  });

  describe('WHEN we get the TopicArn', () => {
    const arn = TopicArn();
    it('THEN it is currently an empty string as it is not yet implemented', () => {
      expect(arn).toBe('');
    });
  });

  describe('WHEN we get the sqsEndpoint', () => {
    const endpoint = sqsEndpoint();
    it('THEN it is currently an empty string as it is not yet implemented', () => {
      expect(endpoint).toBe('');
    });
  });

  describe('WHEN we get the sqsUrl', () => {
    const url = sqsUrl();
    it('THEN it is currently an empty string as it is not yet implemented', () => {
      expect(url).toBe('');
    });
  });

  process.env.NODE_ENV = 'test';
});
