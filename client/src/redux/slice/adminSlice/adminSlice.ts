import { createSlice, TaskAbortError } from "@reduxjs/toolkit";
import { loginAdmin } from "../../middleware/loginAdminThunk";
import { toast } from "react-toastify";
import { logoutAdmin } from "../../middleware/logoutAdmin";
import { getUsersAdmin } from "../../middleware/getUsersAdmin";
import { updateUserAdmin } from "../../middleware/updateUserAdmin";
import { deleteUserAdmin } from "../../middleware/deleteUserAdimin";

interface InitialState {
    admin: null | Admin;
    users: [];
    loading: boolean;
    error: null | string;
    userUpdate: boolean;
    editPop: boolean;
}

interface Admin {
    name: string;
    email: string;
}

const initialState: InitialState = {
    admin: null,
    users: [],
    loading: false,
    error: null,
    userUpdate: false,
    editPop: false,
}

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setEditPop(state) {
            state.editPop = !state.editPop;
        }
    },
    extraReducers: (builder) => {
        builder

            //admin login
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload.user;
               
                toast.success("Welcome Admin!", { autoClose: 1000 });
            })
            .addCase(loginAdmin.pending, (state) => {
                
                toast.loading("Loading");
                state.loading = true;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
               
                toast.error(action.payload.message);
                state.loading = false;
            })

            // admin logout
            .addCase(logoutAdmin.fulfilled, (state) => {
                state.admin = null;
                state.loading = false;
                state.error = null;
                state.users = [];
            })
            .addCase(logoutAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutAdmin.rejected, (state) => {
                state.loading = false;
               
                toast.error("Something went wrong...", { autoClose: 2000 });
            })

            //get all users
            .addCase(getUsersAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.user;
                setInterval(() => {
                    toast.dismiss();
                }, 2000);
            })
            .addCase(getUsersAdmin.rejected, () => {
               
                toast.error("Something went wrong...");
            })
            .addCase(getUsersAdmin.pending, () => {
            })

            //update user
            .addCase(updateUserAdmin.fulfilled, (state) => {
                state.editPop = false;
                toast.success("User updated...", { autoClose: 2000 })
            })
            .addCase(updateUserAdmin.pending, () => {
                toast.loading("Loading...", { autoClose: 2000 })
            })
            .addCase(updateUserAdmin.rejected, (_, action) => {
                toast.error(action.payload.message, { autoClose: 3000 });
            })

            //delete user
            .addCase(deleteUserAdmin.fulfilled, (state) => {
                state.loading = false;
                toast.success("Deleted..", { autoClose: 5000 })
            })
            .addCase(deleteUserAdmin.pending, (state) => {
                state.loading = true;
                toast.loading("Delete user loading...", { autoClose: 5000 })
            })
            .addCase(deleteUserAdmin.rejected, (state) => {
                state.loading = false;
                toast.error("something went wrong")
            })
    }

});

export const { setEditPop } = adminSlice.actions;
export default adminSlice.reducer;