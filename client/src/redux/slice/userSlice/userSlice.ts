import { createSlice } from "@reduxjs/toolkit";
import { type InitialState, } from "./type";
import { createUser } from "../../middleware/createUserThunk";



const initialState: InitialState = {
    loading: false,
    error: null,
    success: null,
    user: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = { color: 'green', status: 'User created sucess' };
                state.user = action.payload
                if (state.user && !action.payload.isAdmin) {
                    state.user.isAdmin = false;
                }
            })
            .addCase(createUser.rejected, (state) => {
                state.loading = false;
                state.error = { color: 'red', status: 'Something went wrong' }
            })
    }

})

export const { logout } = userSlice.actions;

export default userSlice.reducer;