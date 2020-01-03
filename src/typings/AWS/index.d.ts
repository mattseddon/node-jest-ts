export default interface QueueData {
  Messages: {
    MessageId: string;
    ReceiptHandle: string;
    MD5OfBody: string;
    Body: string;
  }[];
}
