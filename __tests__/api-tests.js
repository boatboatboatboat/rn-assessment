import fetchMock from "fetch-mock";
import {apiUrl} from "../api-config.json";
import api from "../src/api";

describe("API function tests", () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it("check getPosts", () => {
        fetchMock.getOnce(apiUrl + "/posts", {
            body: [
                {
                    id: 42,
                    userId: 3,
                    title: "THIS IS a TITLE",
                    body: "check getPosts url",
                },
                {
                    id: 4,
                    userId: 5,
                    title: "hello!",
                    body: "this is a body",
                },
            ],
            headers: {"content-type": "application/json"},
        });

        return api.getPosts().then(() => {
            expect(fetchMock.called(apiUrl + "/posts")).toBe(true);
        });
    });

    it("check getPostById", () => {
        fetchMock.getOnce(apiUrl + "/posts/1234", {
            body: {
                id: 4,
                userId: 5,
                title: "hello!",
                body: "this is a body",
            },
            headers: {"content-type": "application/json"},
        });

        return api.getPostById(1234).then(() => {
            expect(fetchMock.called(apiUrl + "/posts/1234")).toBe(true);
        });
    });

    it("check getUserById", () => {
        fetchMock.getOnce(apiUrl + "/users/2", {
            body: {
                id: 1,
                name: "testing name",
                username: "testing username",
            },
            headers: {"content-type": "application/json"},
        });

        return api.getUserById(2).then(() => {
            expect(fetchMock.called(apiUrl + "/users/2")).toBe(true);
        });
    });
});
