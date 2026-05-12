
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
  token: parseLocalStorageItem(localStorage.getItem("token")),
  signupData: null,
  loading: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {
    setToken(state, value) {
      state.token = value.payload;
    },
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});
export const { setToken, setSignupData, setLoading } = authSlice.actions;
export default authSlice.reducer;
