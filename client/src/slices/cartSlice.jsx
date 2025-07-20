import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Initialize the cart state from localStorage, or set default values if not found
const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

// Create a Redux slice for cart management
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add a course to the cart
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        // If the course is already in the cart, show an error message
        toast.error("Course already in cart");
        return;
      }

      // Add the new course to the cart and Update total price and item count
      state.cart.push(course);
      state.totalItems++;
      state.total += course.price;

      // Save updated cart data to localStorage and Show success message
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      toast.success("Course added to cart");
    },

    // Action to remove a course from the cart
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      if (index >= 0) {
        // Reduce total items and total price before removing the course
        state.totalItems--;
        state.total -= state.cart[index].price;

        // Remove the course from the cart and Save updated cart data to localStorage
        state.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        toast.success("Course removed from cart");
      }
    },

    // Action to reset the cart and Clear cart data
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;

      // Remove cart data from localStorage
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
      toast.success("Cart has been reset");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions
export default cartSlice.reducer