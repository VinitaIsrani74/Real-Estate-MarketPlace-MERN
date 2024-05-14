import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.error = null),
        (state.loading = false);
    },
    signInFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    signOutStart: (state) =>{
      state.loading = true;
    },
    signOutSuccess: (state) => {
      (state.currentUser = null),
        (state.error = null),
        (state.loading = false);
    },
    signOutFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    updateUserStart: (state) =>{
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.error = null),
        (state.loading = false);
    },
    updateUserFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    deleteUserStart: (state) =>{
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      (state.currentUser = null),
        (state.error = null),
        (state.loading = false);
    },
    deleteUserFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },

  },
});

export const {signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutStart, signOutSuccess, signOutFailure} = userSlice.actions
export default userSlice.reducer