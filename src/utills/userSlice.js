import { createSlice } from "@reduxjs/toolkit";

const userSclice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: (state, action) => {
            return null;
        }
    }
});

export const { addUser, removeUser } = userSclice.actions;
export default userSclice.reducer;