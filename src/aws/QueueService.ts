import QueueData from '../typings/AWS';
import * as AWS from 'aws-sdk';
import { promisify } from 'util';
import { sqsEndpoint, sqsUrl } from './metadata';

export default class QueueService {
  private sqsUrl = sqsUrl();
  private sqs = new AWS.SQS({
    endpoint: sqsEndpoint(),
    region: 'us-east-1',
  });

  sqsReceivePromise = promisify(this.sqs.receiveMessage).bind(this.sqs);

  sqsReceiveMessage = () => {
    return this.sqsReceivePromise({
      QueueUrl: this.sqsUrl,
      MaxNumberOfMessages: 1,
    });
  };

  receive = async (): Promise<
    | {
        MessageId?: string;
        ReceiptHandle?: string;
        MD5OfBody?: string;
        Body?: string;
      }
    | { ERROR: string; Body?: string }
  > => {
    try {
      const queueData: QueueData = await this.sqsReceiveMessage();
      if (this.queueHasMessages(queueData)) {
        return this.processMessages(queueData);
      } else {
        return {};
      }
    } catch (e) {
      return { ERROR: e };
    }
  };

  private processMessages = (queueData: QueueData) => {
    const [firstMessage] = queueData.Messages;
    this.sqsDeleteMessage(firstMessage.ReceiptHandle);
    return firstMessage;
  };

  private queueHasMessages = (queueData: QueueData) => {
    return queueData && queueData.Messages && queueData.Messages.length > 0;
  };

  sqsDeleteMessage = (ReceiptHandle: string) => {
    this.sqs.deleteMessage(this.makeDeleteParams(ReceiptHandle));
  };

  private makeDeleteParams = (ReceiptHandle: string) => {
    return {
      QueueUrl: this.sqsUrl,
      ReceiptHandle: ReceiptHandle,
    };
  };
}
