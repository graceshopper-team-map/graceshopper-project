import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk("/fetchAllUsers", async () => {
  try {
    const { data } = await axios.get("/api/users");
    return data;
  } catch (e) {
    console.log(e.message);
  }
});

export const fetchSingleUser = createAsyncThunk(
  "/users/:userId",
  async (userId) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      return data;
    } catch (e) {
      console.log(e.message);
    }
  }
);

export const editUser = createAsyncThunk(
  "editUser",
  async ({ userId, firstName, lastName, address, email, biography, website, facebook }) => {
    try {
      const { data } = await axios.put(`/api/users/${userId}`, {
        firstName,
        lastName,
        email,
        address,
        biography,
        website,
        facebook
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: { users: [], user: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
  },
});

export const selectUser = (state) => state.user;
export const selectUsers = (state) => state.users;
export default userSlice.reducer;
