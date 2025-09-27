import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchData from "../../services/apiService";
import type { FormDataOne } from "../slice/userSlice/type";

export const loginUser = createAsyncThunk(
    "user/login",
    async (loginFromData: FormDataOne, { rejectWithValue }) => {
        try {
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginFromData),
            }

            const data = await fetchData('/api/login', options);

            if (data.status === 'success') return data;
            return rejectWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }

    }
)