import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchData from "../../services/apiService";

export const getUserData = createAsyncThunk(

    "user/getUserData",

    async (_, { rejectWithValue }) => {

        try {

            const data = await fetchData('/api/get-user-data', { method: "GET" });

            if (data.status === 'success') return data;

            return rejectWithValue(data);

        } catch (error) {

            return rejectWithValue(error);

        }
    }
)