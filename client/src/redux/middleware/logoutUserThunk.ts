import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchData from "../../services/apiService";

export const logoutUser = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchData('/api/logout', {
                method: "POST",
            })

            if (data.status === 'success') return data;
            return rejectWithValue(data);

        } catch (error) {
            rejectWithValue(error);
        }
    }
)