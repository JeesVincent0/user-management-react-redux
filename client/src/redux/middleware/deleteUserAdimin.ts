import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchData from "../../services/apiService";

export const deleteUserAdmin = createAsyncThunk(
    'admin/delete-user',
    async (id: string, { rejectWithValue }) => {
        try {
            const data = await fetchData('/api/delete-user', {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }) 
            });
            if (data.status === 'success') return data;
            return rejectWithValue(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)