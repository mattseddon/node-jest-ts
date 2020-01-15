require('dotenv').config();

const useLocal = (): boolean => {
  return process.env.NODE_ENV !== 'production' ? true : false;
};

export const snsEndpoint = (): string => {
  return useLocal() ? 'http://localhost:4575' : '';
};
export const TopicArn = (): string => {
  return useLocal() ? 'arn:aws:sns:us-east-1:000000000000:local-topic' : '';
};

export const sqsEndpoint = (): string => {
  return useLocal() ? 'http://localhost:4576' : '';
};
export const sqsUrl = (): string => {
  return useLocal() ? sqsEndpoint() + '/queue/local-queue' : '';
};

export const region = (): string => {
  return 'us-east-1';
};
