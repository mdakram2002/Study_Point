import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user:null,
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            console.log("SETTING USER IN REDUX: ", action.payload);
            state.user = action.payload;
        },
    }
});
export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;