import QueueData from '../typings/AWS';
import * as AWS from 'aws-sdk';
import { promisify } from 'util';
import { sqsEndpoint, sqsUrl } from './metadata';

export default class SQS {
  sqs = new AWS.SQS({
    endpoint: sqsEndpoint,
    region: 'us-east-1',
  });

  sqsReceivePromise = promisify(this.sqs.receiveMessage).bind(this.sqs);

  sqsReceiveMessage = () => {
    return this.sqsReceivePromise({
      QueueUrl: sqsUrl,
      MaxNumberOfMessages: 1,
    });
  };

  receive = async () => {
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
      QueueUrl: sqsUrl,
      ReceiptHandle: ReceiptHandle,
    };
  };
}
let sqs = new SQS();
setInterval(sqs.receive, 500);
