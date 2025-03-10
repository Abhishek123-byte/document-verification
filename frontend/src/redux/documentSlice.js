import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios"; 

// Upload Document
export const uploadDocument = createAsyncThunk(
    "document/upload",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await API.post("/documents/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const documentSlice = createSlice({
    name: "document",
    initialState: { document: null, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadDocument.pending, (state) => { state.loading = true; })
            .addCase(uploadDocument.fulfilled, (state, action) => {
                state.loading = false;
                state.document = action.payload.document;
            })
            .addCase(uploadDocument.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export default documentSlice.reducer;
