import NotificationService from "../../aws/NotificationService";

const AWSMock = jest.mock("aws-sdk", () => {
    const SQSMocked = {
        receiveMessage: jest.fn(),
        deleteMessage: jest.fn(),
        promise: jest.fn()
    };
    return {
        SQS: jest.fn().mockImplementation(() => SQSMocked)
    };
});

afterAll(() => AWSMock.unmock("aws-sdk"));

describe("GIVEN a notificationService with the AWS SNS mocked", () => {
    const notificationService = new NotificationService();

    describe("WHEN the underlying promise is rejected", () => {
        const rejectValue = "go away & GF";

        it("THEN an object containing an ERROR is returned", async () => {
            const spyPromise = jest
                .spyOn(notificationService, "snsPublish")
                .mockRejectedValue(rejectValue);

            const published = await notificationService.publish(
                "this is a message that will never be seen by anyone (single tear)"
            );
            expect(published).toEqual({ ERROR: rejectValue });
            expect(spyPromise).toBeCalledTimes(1);

            spyPromise.mockRestore();
        });
    });

    describe("WHEN the underlying promise is resolved", () => {
        const resolveValue = {
            ResponseMetadata: { RequestId: "638270a0" },
            MessageId: "51a4643e"
        };

        it("THEN an object containing the resolved value is returned", async () => {
            const spyPromise = jest
                .spyOn(notificationService, "snsPublish")
                .mockResolvedValue(resolveValue);

            const published = await notificationService.publish(
                "this is a message that could be seen by anyone.... lovely"
            );
            expect(published).toEqual(resolveValue);
            expect(spyPromise).toBeCalledTimes(1);

            spyPromise.mockRestore();
        });
    });
});
