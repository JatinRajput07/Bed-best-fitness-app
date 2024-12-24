import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '@/configs/Axios';

// Fetch Users
export const fetchUsers = createAsyncThunk('/admin/user-list', async ({ }, { rejectWithValue }) => {
    try {
        const response = await Axios.get('/admin/user-list', {
            params: {
                // page,
                // pageSize: 10,
                // search: searchQuery,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});


// Fetch User Details
export const fetchUserDetails = createAsyncThunk('/admin/get-user-profile', async ({ id }, { rejectWithValue }) => {
    try {
        const response = await Axios.get(`/admin/get-user-profile/${id}`);

        // console.log(response.data.data)

        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Delete User
export const deleteUser = createAsyncThunk('/admin/user-delete', async (userId, { rejectWithValue }) => {
    try {

        // console.log(userId,'======userId=====')
        await Axios.delete(`/admin/user-delete/${userId}`);
        return userId;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Create User
export const createUser = createAsyncThunk('/admin/user-create', async (userData, { rejectWithValue }) => {
    try {
        const response = await Axios.post('/admin/users', userData, { validateStatus: false });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Update User
export const updateUser = createAsyncThunk('/admin/user-update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const response = await Axios.put(`/admin/users/${id}`, data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Slice
const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        totalUsers: 0,
        userProfile: null,
        profileLoading: false,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.totalUsers = action.payload.totalRecords;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch User Details
            .addCase(fetchUserDetails.pending, (state) => {
                state.profileLoading = true;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.profileLoading = false;
                state.userProfile = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.profileLoading = false;
                state.error = action.payload;
            })

            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create User
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = [action.payload.user, ...state.users]; // Add the new user to the list
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update User
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((user) =>
                    user.id === action.payload.user.id ? action.payload.user : user
                ); // Update the user in the list
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
