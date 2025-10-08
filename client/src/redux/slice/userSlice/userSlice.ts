import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type InitialState } from "./type";
import { createUser } from "../../middleware/createUserThunk";
import { toast } from "react-toastify";
import { loginUser } from "../../middleware/loginUserThunk";
import { getUserData } from "../../middleware/getUserThunk";
import { logoutUser } from "../../middleware/logoutUserThunk";
import { updateUserProfile } from "../../middleware/updateUserThunk";

const initialState: InitialState = {
    loading: false,
    error: null,
    user: null,
    isEditing: false,
}

interface ErrorPayload {
    message: string;
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading(state) {
            state.loading = false;
        },
        setisEditing(state, action) {
            state.isEditing = action.payload;
        }
    },
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
                state.user = null;
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

                if (action.payload) {
                    toast.error(`server: ${action.payload.message}`);
                } else {
                    toast.error("Something went wrong...");
                    toast.error("try again...");
                }

                state.loading = false;
                state.user = null;
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
                state.user = null;
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<ErrorPayload>) => {
                toast.dismiss();
                state.loading = false;
                state.user = null;
                if (action.payload && typeof action.payload?.message === 'string') toast.error(action.payload.message);
            })

            // getuser
            .addCase(getUserData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.loading = false;
                toast.dismiss();
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
                state.user = null;
            })

            // update user profile
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isEditing = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isEditing = false;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                toast.error(action.payload?.message, { autoClose: 3000 });
                state.isEditing = true;
            });



    }

})

export const { setLoading, setisEditing } = userSlice.actions;
export default userSlice.reducer;