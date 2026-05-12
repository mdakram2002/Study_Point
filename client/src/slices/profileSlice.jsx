import { createSlice } from "@reduxjs/toolkit";

const parseLocalStorageItem = (item) => {
  if (!item) return null;
  try {
    return JSON.parse(item);
  } catch (error) {
    return item;
  }
};

const initialState = {
   user: parseLocalStorageItem(localStorage.getItem("user")),
   loading: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            console.log("SETTING USER IN REDUX: ", action.payload);
            state.user = action.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
          },
    }
});
export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;