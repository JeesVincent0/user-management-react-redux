import { createAsyncThunk } from "@reduxjs/toolkit";
import { type FormDataOne } from "../slice/userSlice/type";
import fetchData from "../../services/apiService";

export const createUser = createAsyncThunk(
    "user/createUser",
    async (formData: FormDataOne, { rejectWithValue }) => {
        try {
            const options = {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            }

            const data = await fetchData(`/api/signup`, options);

            if (data.status === "success") return data;
            return rejectWithValue(data)

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)