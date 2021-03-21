import {apiUrl} from "../../api-config.json";

export const getResource = function (resource) {
    return fetch(apiUrl + resource);
};

const validatePost = function (json) {
    if (json.id == null) {
        throw new Error("post is missing id");
    } else if (json.userId == null) {
        throw new Error("post is missing userId");
    } else if (json.title == null) {
        throw new Error("post is missing title");
    } else if (json.body == null) {
        throw new Error("post is missing body");
    }
};

export const api = {
    async getUserById(userId) {
        if (typeof userId !== "number") {
            throw new Error("userId should be a number");
        }

        const response = await getResource("/users/" + userId);
        const json = await response.json();

        if (json.id == null) {
            throw new Error("user is missing id");
        } else if (json.name == null) {
            throw new Error("user is missing name");
        } else if (json.username == null) {
            throw new Error("user is missing username");
        }
        return json;
    },
    async getPosts() {
        const response = await getResource("/posts");
        const json = await response.json();

        if (typeof json !== "object" || !Array.isArray(json)) {
            throw new Error("did not receive an array");
        }

        json.forEach(post => validatePost(post));

        return json;
    },
    async getPostById(postId) {
        if (typeof postId !== "number") {
            throw new Error("postId should be a number");
        }

        const response = await getResource("/posts/" + postId);
        const json = await response.json();

        validatePost(json);

        return json;
    },
};

export default api;
