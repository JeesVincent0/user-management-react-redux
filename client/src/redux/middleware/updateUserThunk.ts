import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchData from "../../services/apiService";

export const updateUserProfile = createAsyncThunk(
    "user/updateProfile",
    async (formData: FormData, { rejectWithValue }) => {
        try {

            const options = { method: "PUT", body: formData }

            const data = await fetchData('/api/udate-profile', options);

            if (data.status === "success") {
                return data.user;
            } else {
                return rejectWithValue(data);
            }
        } catch (error) {
            return rejectWithValue(error || "Server error");
        }
    }
);