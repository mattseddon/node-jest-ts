import * as AWS from "aws-sdk";
import { promisify } from "util";
import { snsEndpoint, TopicArn, region } from "./metadata";

export default class NotificationService {
    private sns = new AWS.SNS({ endpoint: snsEndpoint(), region: region() });

    snsPublish = promisify(this.sns.publish).bind(this.sns);

    public publish = async (
        msg: string
    ): Promise<
        | { ResponseMetadata: { RequestId: string }; MessageId: string }
        | { ERROR: object }
    > => {
        const publishParams: { TopicArn: string; Message: string } = {
            TopicArn: TopicArn(),
            Message: msg
        };
        let topicRes;
        try {
            topicRes = await this.snsPublish(publishParams);
        } catch (error) {
            topicRes = { ERROR: error };
        }
        return topicRes;
    };
}
