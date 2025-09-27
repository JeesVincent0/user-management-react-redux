import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchData from "../../services/apiService";

export const getUserData = createAsyncThunk(

    "user/getUserData",

    async (_, { rejectWithValue }) => {

        try {

            const data = await fetchData('/api/get-user-data', { method: "GET" });

            console.log("This data is from the get thunk: ", data);
            if (data.status === 'success') {
                return data;
            } else {
                return rejectWithValue(data);
            }


        } catch (error) {

            rejectWithValue(error);

        }
    }
)