import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchData from "../../services/apiService";

export const updateUserAdmin = createAsyncThunk(
    "admin/userupdate", 
    async (formData, {rejectWithValue}) => {
        try {
            const options = {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify(formData),
            }
            const data = await fetchData('/api/update-user-admin', options);

            if(data.status === 'success') return data;

            return rejectWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
)