import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../api";

export const PostStatus = {
    Loading: 0,
    Ready: 1,
    Failed: 2,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    return await api.getPosts();
});

export const fetchPost = createAsyncThunk("posts/fetchPost", async postId => {
    return await api.getPostById(postId);
});

export const slice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        status: PostStatus.Loading,
    },
    reducers: {},
    extraReducers: {
        [fetchPost.fulfilled]: (state, action) => {
            const newPost = action.payload;
            const postId = action.meta.arg;
            const postIndex = state.posts.findIndex(x => x.id === postId);
            if (postIndex === -1) {
                // The post is not in our store, so add it.
                state.posts.push(newPost);
            } else {
                // We already have the post, so update it instead.
                state.posts[postIndex] = newPost;
            }
        },
        [fetchPosts.pending]: state => {
            state.status = PostStatus.Loading;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = PostStatus.Ready;
            state.posts = action.payload;
        },
        [fetchPosts.rejected]: state => {
            state.status = PostStatus.Failed;
            state.posts = [];
        },
    },
});
export default slice.reducer;
