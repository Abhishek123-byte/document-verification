import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios"; 

export const registerUser = createAsyncThunk("users/register", async (userData, { rejectWithValue }) => {
    try {
        const res = await API.post("/users/register", userData);
        localStorage.setItem("token", res.data.token);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const loginUser = createAsyncThunk("users/login", async (userData, { rejectWithValue }) => {
    try {
        const res = await API.post("/users/login",userData );
        localStorage.setItem("token", res.data.token);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const logoutUser = () => {
    localStorage.removeItem("token");
    return { type: "auth/logout" };
};

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, token: localStorage.getItem("token") || null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => { state.loading = true; })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(loginUser.pending, (state) => { state.loading = true; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase("auth/logout", (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export default authSlice.reducer;
