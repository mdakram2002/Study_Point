import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    totalItems: localStorage.getItem('totalItems')? JSON.parse(localStorage.getItem('totalItems')) : 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setTotalItems(state, value) {
            state.cart = value.payload;
        },
        // TODO: add to cart  and remove form cart items
    }
});
export const { setTotalItems } = cartSlice.actions;
export default cartSlice.reducer;


