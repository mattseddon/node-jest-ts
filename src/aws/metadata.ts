require('dotenv').config();

const useLocal: boolean = process.env.NODE_ENV !== 'production';

export const snsEndpoint: string = useLocal ? 'http://localhost:4575' : '';
export const TopicArn: string =
  'arn:aws:sns:us-east-1:000000000000:local-topic';

export const sqsEndpoint: string = useLocal
  ? 'http://localhost:4576'
  : undefined;
export const sqsUrl: string = useLocal
  ? sqsEndpoint + '/queue/local-queue'
  : undefined;
