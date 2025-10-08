import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchData from "../../services/apiService";

export const loginAdmin = createAsyncThunk(
    'admin/login',
    async (formData, { rejectWithValue }) => {
        try {

            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            }

            const data = await fetchData('/api/admin-login',options);

            if(data.status === 'success') return data;
            return rejectWithValue(data);
            
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)