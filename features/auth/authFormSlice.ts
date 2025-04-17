// features/auth/authFormSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthFormState {
  email: string | null;
  emailError: string | null;
  password: string | null;
  passwordError: string | null;
  phoneNumber: string;
}

const initialState: AuthFormState = {
  email: null,
  emailError: null,
  password: null,
  passwordError: null,
  phoneNumber: "",
};

const authFormSlice = createSlice({
  name: "authForm",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.emailError = null;
    },
    validateEmail: (state, action: PayloadAction<string | null>) => {
      state.emailError = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
      state.passwordError = null;
    },
    validatePassword: (state, action: PayloadAction<string | null>) => {
      state.passwordError = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    clearForm: (state) => {
      state.email = null;
      state.emailError = null;
      state.password = null;
      state.passwordError = null;
      state.phoneNumber = "";
    },
  },
});

export const {
  setEmail,
  validateEmail,
  setPassword,
  validatePassword,
  setPhoneNumber,
  clearForm,
} = authFormSlice.actions;
export default authFormSlice.reducer;
