import { createAsyncThunk } from "@reduxjs/toolkit";
import { type FormDataOne } from "../slice/userSlice/type";

export const createUser = createAsyncThunk(
    "user/createUser",
    async (formData: FormDataOne, thunkapi) => {
        try {
            const res = await fetch('http://localhost:3000/api/signup', {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const data = await res.json();

            console.log("Data received from the backend", data)

            if (data.status === 'success') {
                return data;
            } else {
                return thunkapi.rejectWithValue(data.error)
            }
        } catch (error) {
            return thunkapi.rejectWithValue(error)
        }
    }
)