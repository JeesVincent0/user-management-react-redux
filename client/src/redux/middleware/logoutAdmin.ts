import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchData from "../../services/apiService";

export const logoutAdmin = createAsyncThunk(
    'admin/logout',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchData("/api/logout-admin", { method: "POST" });

            if (data.status === "success") return data;
            return rejectWithValue(data);
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)