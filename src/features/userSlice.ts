import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../app/store";

const AUTH_ENDPOINT = `${import.meta.env.VITE_BASE_URL_API}/auth` as string;

// Define a type for the slice state
interface InitialStateInterface {
  status: string;
  error: string;
  user: {
    id: string;
    name: string;
    email: string;
    picture: string;
    status: string;
    token: string;
  };
}

// Define the initial state using that type
const initialState: InitialStateInterface = {
  status: "",
  error: "",
  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (values: any, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "post",
        // url: `http://localhost:5000/api/auth/register`,
        url: `${AUTH_ENDPOINT}/register`,
        data: { ...values },
      });
      return res?.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data?.error?.message);
      }
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signIn",
  async (values: any, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "post",
        // url: `http://localhost:5000/api/auth/register`,
        url: `${AUTH_ENDPOINT}/login`,
        data: { ...values },
      });
      return res?.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data?.error?.message);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
      };
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // REGISTER USER
      .addCase(registerUser.pending, (state, _action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // SIGN IN USER
      .addCase(signInUser.pending, (state, _action) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.error = "";
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout, changeStatus } = userSlice.actions;

export default userSlice.reducer;
