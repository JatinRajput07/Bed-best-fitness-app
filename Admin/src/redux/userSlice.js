import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '@/configs/Axios';

export const fetchUsers = createAsyncThunk('/admin/user-list', async ({ page, searchQuery }, { rejectWithValue }) => {
    try {
        const response = await Axios.get('/admin/user-list', {
            params: {
                page,
                pageSize: 10,
                search: searchQuery,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteUser = createAsyncThunk('admin/user-delete', async (userId, { rejectWithValue }) => {
    try {
        await Axios.delete(`admin/user-delete/${userId}`);
        return userId;
    } catch (error) {
        return rejectWithValue(error.message);
    }
}
);



const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        totalUsers: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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
    },
});

export default userSlice.reducer;
