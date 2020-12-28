import axios from "axios";
import Requests from "../Requests";
import { Response, Responses, PromiseResponses } from "../types/Response";

describe("GIVEN a url which returns a specific status", () => {
    const url = "https://httpbin.org/status/200";
    const requests = new Requests();
    describe("WHEN we perform a get request", () => {
        it("THEN a response with a 200 status is returned", async () => {
            const response: Response = await requests.get(url);
            expect(response.status).toEqual(200);
            expect(response.statusText).toEqual("OK");
        });
    });
});

describe("GIVEN a url which returns a specific status", () => {
    const url = "https://httpbin.org/status/500";
    const requests = new Requests();
    describe("WHEN we perform a get request", () => {
        it("THEN a response with a 500 status is returned", async () => {
            const response: Response = await requests.get(url);
            expect(response.status).toEqual(500);
            expect(response.statusText).toEqual("INTERNAL SERVER ERROR");
            expect(response.data).toEqual(
                Error("Request failed with status code 500")
            );
        });
    });
});

describe("GIVEN another httpbin url", () => {
    const url = "https://httpbin.org/anything";
    const requests = new Requests();
    const data = { "what I give": "is", "what I get": true };
    describe("WHEN we perform a post request", () => {
        it("THEN a response with a 200 status and the object that was sent is returned", async () => {
            const response: Response = await requests.post(url, data);
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(data);
            expect(response.statusText).toEqual("OK");
        });
    });
});

describe("GIVEN a url and some data", () => {
    const url = "https://httpbin.org/anything";
    const requests = new Requests();
    const data = { "what I give": "is", "what I get": true };

    describe("WHEN we make a post request but the underlying promise is rejected", () => {
        const rejectText = "DEAD";
        const rejectStatus = 799;
        const errorObject = {
            message: "goodbyyyyyeeeee",
            response: { statusText: rejectText, status: rejectStatus }
        };
        it("THEN a response containing the correct information is returned", async () => {
            const spyPromise = jest
                .spyOn(axios, "post")
                .mockRejectedValue(errorObject);

            const response: Response = await requests.post(url, data);

            expect(response.status).toEqual(rejectStatus);
            expect(response.data).toEqual(errorObject);
            expect(response.statusText).toEqual("DEAD");
            expect(spyPromise).toBeCalledTimes(1);
            spyPromise.mockRestore();
        });
    });
});

describe("GIVEN two urls, some data and a promise responses object", () => {
    const getUrl = "https://httpbin.org/status/200";
    const postUrl = "https://httpbin.org/anything";
    const requests = new Requests();
    const data = { "what I give": "is", "what I get": true };
    const promises: PromiseResponses = {
        get: requests.get(getUrl),
        post: requests.post(postUrl, data)
    };
    describe("WHEN we perform all of the requests asynchronously", () => {
        it("THEN an object containing responses with the expected values is returned", async () => {
            const responses: Responses = await requests.all(promises);

            expect(responses.get.status).toEqual(200);
            expect(responses.get.statusText).toEqual("OK");

            expect(responses.post.status).toEqual(200);
            expect(responses.post.data).toEqual(data);
            expect(responses.post.statusText).toEqual("OK");
        });
    });
});

describe("GIVEN three urls, some data and a promise responses object", () => {
    const get500Url = "https://httpbin.org/status/500";
    const get200Url = "https://httpbin.org/status/200";
    const postUrl = "https://httpbin.org/anything";
    const requests = new Requests();
    const data = { "what I give": "is", "what I get": true };
    const promises = {
        get500: requests.get(get500Url),
        get200: requests.get(get200Url),
        post: requests.post(postUrl, data)
    };
    describe("WHEN we perform all of the requests asynchronously", () => {
        it("THEN an object containing responses with the expected values is returned", async () => {
            const responses = await requests.all(promises);

            expect(responses.get500.status).toEqual(500);
            expect(responses.get500.statusText).toEqual(
                "INTERNAL SERVER ERROR"
            );
            expect(responses.get500.data).toEqual(
                Error("Request failed with status code 500")
            );

            expect(responses.get200.status).toEqual(200);
            expect(responses.get200.statusText).toEqual("OK");

            expect(responses.post.status).toEqual(200);
            expect(responses.post.data).toEqual(data);
            expect(responses.post.statusText).toEqual("OK");
        });
    });
});

describe("GIVEN two urls and some data", () => {
    const getUrl = "https://httpbin.org/status/200";
    const postUrl = "https://httpbin.org/anything";
    const requests = new Requests();
    const data = { "what I give": "is", "what I get": true };

    describe("WHEN we try to perform all of the requests asynchronously but one promise is rejected", () => {
        it("THEN an object containing only the first ERROR is returned", async () => {
            const rejectText = "DEAD";
            const rejectStatus = 799;
            const errorObject = {
                message: "goodbyyyyyeeeee",
                response: { statusText: rejectText, status: rejectStatus }
            };

            const spyPromise = jest
                .spyOn(requests, "get")
                .mockRejectedValue(errorObject);

            const promises: PromiseResponses = {
                get: requests.get(getUrl),
                post: requests.post(postUrl, data)
            };

            const responses: Responses = await requests.all(promises);

            expect(responses.Error.status).toEqual(799);
            expect(responses.Error.data).toEqual(errorObject);
            expect(responses.Error.statusText).toEqual("DEAD");

            spyPromise.mockRestore();
        });
    });
});
