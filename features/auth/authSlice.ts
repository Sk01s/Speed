import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  currentUserId: string | null;
}

const initialState: AuthState = {
  currentUserId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUserId = action.payload;
    },
    logout: (state) => {
      state.currentUserId = null;
    },
  },
});

export const { setCurrentUser, logout } = authSlice.actions;
export default authSlice.reducer;
