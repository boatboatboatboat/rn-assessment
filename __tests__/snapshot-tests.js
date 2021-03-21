import fetchMock from "fetch-mock";
import React from "react";
import {Provider} from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {PostItem, PostList} from "../src/screens/posts";
import {PostStatus} from "../src/reducers/posts";
import {UserLoadStatus} from "../src/reducers/users";
import {DetailedPost} from "../src/screens/detail";

const mockStore = configureStore();
const store = mockStore({
    posts: {
        posts: [
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
        status: PostStatus.Ready,
    },
    users: {
        users: [
            {
                id: 3,
                name: "Test name",
                username: "Testusername",
                loadStatus: {status: UserLoadStatus.Ready},
            },
            {
                id: 5,
                name: "Other tester",
                username: "Usertest",
                loadStatus: {status: UserLoadStatus.Ready},
            },
        ],
    },
});

describe("Snapshot tests", () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it("Simple item snapshot with valid id", () => {
        const tree = renderer.create(
            <Provider store={store}>
                <PostItem postId={4} />
            </Provider>,
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it("Simple item snapshot with invalid id", () => {
        const tree = renderer.create(
            <Provider store={store}>
                <PostItem postId={0} />
            </Provider>,
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it("Posts list snapshot", () => {
        const tree = renderer.create(
            <Provider store={store}>
                <PostList />
            </Provider>,
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it("Detailed post snapshot", () => {
        const tree = renderer.create(
            <Provider store={store}>
                <DetailedPost route={{params: {postId: 4}}} />
            </Provider>,
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
