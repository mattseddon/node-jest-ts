import QueueData from "../types/AWS";
import * as AWS from "aws-sdk";
import { promisify } from "util";
import { sqsEndpoint, sqsUrl, region } from "./metadata";

type DeleteParams = { QueueUrl: string; ReceiptHandle: string };

type Message = {
    MessageId: string;
    ReceiptHandle: string;
    MD5OfBody: string;
    Body: string;
};

export default class QueueService {
    private sqsUrl = sqsUrl();
    private sqs = new AWS.SQS({
        endpoint: sqsEndpoint(),
        region: region()
    });

    sqsReceivePromise = promisify(this.sqs.receiveMessage).bind(this.sqs);

    sqsReceiveMessage = (): Promise<QueueData> => {
        return this.sqsReceivePromise({
            QueueUrl: this.sqsUrl,
            MaxNumberOfMessages: 1
        });
    };

    public receive = async (): Promise<
        | {
              MessageId?: string;
              ReceiptHandle?: string;
              MD5OfBody?: string;
              Body?: string;
          }
        | { ERROR: string; Body?: string }
    > => {
        try {
            const queueData = await this.sqsReceiveMessage();
            if (this.queueHasMessages(queueData)) {
                return this.processMessages(queueData);
            } else {
                return {};
            }
        } catch (e) {
            return { ERROR: e };
        }
    };

    private processMessages = (queueData: QueueData): Message => {
        const [firstMessage] = queueData.Messages;
        this.sqsDeleteMessage(firstMessage.ReceiptHandle);
        return firstMessage;
    };

    private queueHasMessages = (queueData: QueueData): boolean => {
        return queueData && queueData.Messages && queueData.Messages.length > 0;
    };

    sqsDeleteMessage = (ReceiptHandle: string): undefined => {
        this.sqs.deleteMessage(this.makeDeleteParams(ReceiptHandle));
        return;
    };

    private makeDeleteParams = (ReceiptHandle: string): DeleteParams => {
        return {
            QueueUrl: this.sqsUrl,
            ReceiptHandle: ReceiptHandle
        };
    };
}
