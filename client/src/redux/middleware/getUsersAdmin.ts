import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchData from "../../services/apiService";

export const getUsersAdmin = createAsyncThunk(
    "admin/getuser",
    async (key?: string | undefined, { rejectWithValue }) => {
        try {
            const queryParam = key ? `?search=${encodeURIComponent(key)}` : "";
            const data = await fetchData(`/api/get-admin-users${queryParam}`, { method: "get" });

            if (data.status === 'success') return data;

            return rejectWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
)