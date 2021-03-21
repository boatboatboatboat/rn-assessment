import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../api";

export const UserLoadStatus = {
    Loading: 0,
    Ready: 1,
    Failed: 2,
};

export const fetchUser = createAsyncThunk(
    "users/fetchUser",
    async (userId, thunkAPI) => {
        // Check whether the user is being fetched already,
        // if they are, do not fetch again.
        // If the user does already exist, do fetch again.
        const users = thunkAPI.getState().users.users;
        const user = users.find(x => x.id === userId);
        if (user != null) {
            const isCurrentRequester =
                thunkAPI.requestId === user.loadStatus.requestId;

            if (
                user.loadStatus.status !== UserLoadStatus.Ready &&
                !isCurrentRequester
            ) {
                // It's already being fetched, so don't fetch.
                return;
            }
        }
        return await api.getUserById(userId);
    },
);

export const slice = createSlice({
    name: "users",
    initialState: {
        users: [],
    },
    extraReducers: {
        [fetchUser.pending]: (state, action) => {
            const userId = action.meta.arg;
            const user = state.users.find(x => x.id === userId);

            if (user == null) {
                // If the user hasn't been added to the store yet,
                // create the user in the store and set the loading state.
                state.users.push({
                    id: userId,
                    loadStatus: {
                        status: UserLoadStatus.Loading,
                        requestId: action.meta.requestId,
                    },
                });
            } else if (user.loadStatus.status !== UserLoadStatus.Loading) {
                // If the user has been added to the store before,
                // change the existing user's state into loading.
                user.loadStatus = {
                    status: UserLoadStatus.Loading,
                    requestId: action.meta.requestId,
                };
            }
        },
        [fetchUser.rejected]: (state, action) => {
            const {requestId, arg: userId} = action.meta;
            const user = state.users.find(x => x.id === userId);

            // Ignore the errors from inactive requests
            if (user != null && user.loadStatus.requestId === requestId) {
                user.loadStatus.status = UserLoadStatus.Failed;
            }
        },
        [fetchUser.fulfilled]: (state, action) => {
            const {requestId, arg: userId} = action.meta;
            const userIndex = state.users.findIndex(x => x.id === userId);
            const user = state.users[userIndex];

            // The payload of an inactive request is null,
            // so we should ignore them.
            if (user != null && user.loadStatus.requestId === requestId) {
                state.users[userIndex] = action.payload;
                state.users[userIndex].loadStatus = {
                    status: UserLoadStatus.Ready,
                };
            }
        },
    },
});

export default slice.reducer;
