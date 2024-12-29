import Axios from '@/configs/Axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchAssignments = createAsyncThunk('assignUser/fetchAssignments', async () => {
    const response = await Axios.get('/admin/assignments');
    return response.data.data;
});

export const createAssignment = createAsyncThunk('assignUser/createAssignment', async (data) => {
    const response = await Axios.post('/admin/assign', data);
    return response.data.data;
});

export const editAssignment = createAsyncThunk('assignUser/editAssignment', async ({ id, data }) => {
    const response = await Axios.put(`/admin/assign/${id}`, data);
    return response.data.data;
});

export const deleteAssignment = createAsyncThunk('assignUser/deleteAssignment', async ({id, type, userId}) => {
    await Axios.delete(`/admin/assign/${id}?type=${type}&userId=${userId || ''}`);
    return id;
});

const assignUserSlice = createSlice({
    name: 'assignUser',
    initialState: {
        assignments: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssignments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAssignments.fulfilled, (state, action) => {
                state.loading = false;
                state.assignments = action.payload;
            })
            .addCase(fetchAssignments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createAssignment.fulfilled, (state, action) => {
                // state.assignments.push(action.payload);
            })
            .addCase(editAssignment.fulfilled, (state, action) => {
                const index = state.assignments.findIndex(a => a._id === action.payload._id);
                if (index !== -1) {
                    state.assignments[index] = action.payload;
                }
            })
            .addCase(deleteAssignment.fulfilled, (state, action) => {
                state.assignments = state.assignments.filter(a => a._id !== action.payload);
            });
    },
});

export default assignUserSlice.reducer;
