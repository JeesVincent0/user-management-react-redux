import { createSlice } from "@reduxjs/toolkit";
import { type InitialState } from "./type";
import { createUser } from "../../middleware/createUserThunk";
import { toast } from "react-toastify";
import { loginUser } from "../../middleware/loginUserThunk";
import { getUserData } from "../../middleware/getUserThunk";
import { logoutUser } from "../../middleware/logoutUserThunk";

const initialState: InitialState = {
    loading: false,
    error: null,
    success: null,
    user: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // create user
            .addCase(createUser.pending, (state) => {
                toast.dismiss()
                toast.loading("Loading... Please wait", {
                    position: "top-right",
                    closeOnClick: false,
                    draggable: false,
                    closeButton: false,
                });
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                toast.dismiss();
                toast.success("Account created successfully");
                state.loading = false;
                if (action.payload?.user) {
                    state.user = action.payload.user
                }
            })
            .addCase(createUser.rejected, (state, action) => {

                toast.dismiss();

                if (action.payload && typeof action.payload === "string") {
                    toast.error(`server: ${action.payload}`);
                } else {
                    toast.error("Something went wrong...");
                    toast.error("try again...");
                }

                state.loading = false;
            })

            // login
            .addCase(loginUser.fulfilled, (state, action) => {
                toast.dismiss();
                toast.success(action.payload.message);
                state.loading = false;
                if (action.payload?.user) {
                    state.user = action.payload.user
                }
            })
            .addCase(loginUser.pending, (state) => {
                toast.dismiss();
                toast.loading("Loading... please wait!")
                state.loading = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                toast.dismiss();
                state.loading = false;
                if (action.payload && typeof action.payload?.message === 'string') toast.error(action.payload.message);
            })

            // getuser
            .addCase(getUserData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.loading = false;
                toast.dismiss();
                toast.success("Welcome back!", { autoClose: 2000 });
                state.user = action.payload.user;
            })
            .addCase(getUserData.rejected, (state) => {
                state.loading = false;
                state.user = null;
            })

            // logout
            .addCase(logoutUser.rejected, (state) => {
                state.loading = false;
                toast.dismiss();
                toast.error("Something went wrong...");
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.success = null;
                state.user = null;
            })



    }

})

export default userSlice.reducer;