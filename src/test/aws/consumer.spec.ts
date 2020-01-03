import SQS from '../../aws/consumer';
import * as AWS from 'aws-sdk';

jest.mock('aws-sdk', () => {
  const SQSMocked = {
    receiveMessage: jest.fn(),
    deleteMessage: jest.fn(),
    promise: jest.fn(),
  };
  return {
    SQS: jest.fn().mockImplementation(() => SQSMocked),
  };
});

describe('GIVEN a sqs with the AWS SQS mocked and a set of messages', () => {
  const sqs = new SQS();
  const firstMessage = {
    MessageId: '82cdf7e7-9e7d-4285-8c10-97eba0340f56',
    ReceiptHandle:
      '82cdf7e7-9e7d-4285-8c10-97eba0340f56#3eeba587-45ba-4722-95c0-d8c2423da4c4',
    MD5OfBody: '093a748b534e204682ba6c3d3ba23186',
    Body:
      '{"MessageId": "e4cfe5cb-494a-4f42-b7c1-5b7383c79f64", "Type": "Notification", "Timestamp": "2020-01-02T23:04:51.821513Z", "Message": "message #1", "TopicArn": "arn:aws:sns:us-east-1:000000000000:local-topic"}',
  };

  const secondMessage = {
    MessageId: '882e86bd-7d1d-47b5-9a99-1ea76a082c9d',
    ReceiptHandle:
      '882e86bd-7d1d-47b5-9a99-1ea76a082c9d#f1c0e735-7744-414e-9b34-775427dc9a59',
    MD5OfBody: '1c0225666c08fdeb5a2e09499c72458c',
    Body:
      '{"MessageId": "b67daad5-05f9-4ef8-a35b-9182f2c93cab", "Type": "Notification", "Timestamp": "2020-01-02T23:04:51.838059Z", "Message": "message #2", "TopicArn": "arn:aws:sns:us-east-1:000000000000:local-topic"}',
  };

  describe('WHEN the queue receives the messages and the underlying promise is resolved', () => {
    const spyPromise = jest.spyOn(sqs, 'sqsReceivePromise').mockResolvedValue({
      Messages: [firstMessage, secondMessage],
    });

    const spyDelete = jest.spyOn(sqs, 'sqsDeleteMessage');

    it('THEN should return the first message', async () => {
      const actualValue = await sqs.receive();
      expect(actualValue).toEqual(firstMessage);
      expect(spyPromise).toBeCalledTimes(1);
      expect(spyDelete).toBeCalledTimes(1);
    });
  });
});

describe('GIVEN a sqs with the AWS SQS mocked', () => {
  const sqs = new SQS();
  let spyDelete;
  beforeEach(() => {
    spyDelete = jest.spyOn(sqs, 'sqsDeleteMessage');
  });

  describe('WHEN the queue receives no messages and the underlying promise is resolved', () => {
    jest.spyOn(sqs, 'sqsReceivePromise').mockResolvedValue({ Messages: [] });

    it('THEN should return an empty object', async () => {
      const actualValue = await sqs.receive();
      expect(actualValue).toEqual({});
      expect(spyDelete).not.toBeCalled();
    });
  });

  describe('WHEN the queue receives no data and the underlying promise is resolved', () => {
    jest.spyOn(sqs, 'sqsReceivePromise').mockResolvedValue({});

    it('THEN should return an empty object', async () => {
      const actualValue = await sqs.receive();
      expect(actualValue).toEqual({});
      expect(spyDelete).not.toBeCalled();
    });
  });
});

describe('GIVEN a sqs with the AWS SQS mocked', () => {
  const sqs = new SQS();

  describe('WHEN the underlying promise is rejected', () => {
    const rejectValue = 'get fucked';
    const spyPromise = jest
      .spyOn(sqs, 'sqsReceivePromise')
      .mockRejectedValue(rejectValue);

    const spyDelete = jest.spyOn(sqs, 'sqsDeleteMessage');

    it('THEN should return an object containing an ERROR', async () => {
      const actualValue = await sqs.receive();
      expect(actualValue).toEqual({ ERROR: rejectValue });
      expect(spyPromise).toBeCalledTimes(1);
      expect(spyDelete).not.toBeCalled();
    });
  });
});
