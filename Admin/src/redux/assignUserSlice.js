import Axios from '@/configs/Axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';


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

export const updateAssignmentImage = createAsyncThunk(
    'assignUser/updateAssignmentImage',
    async ({ assignmentId, imageData }) => {
        const response = await Axios.patch(`/admin/assign-image/${assignmentId}`, imageData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Important for file uploads
            }
        });
        return response.data.data;
    }
);

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
            }) 
            .addCase(updateAssignmentImage.fulfilled, (state, action) => {
                // When an image is updated, find the specific assignment within the nested structure
                // and update its image URL.
                const updatedAssignment = action.payload;
                state.assignments = state.assignments.map(hostAssignment => {
                    // This assumes `updatedAssignment` refers to an individual assignment entry (asign_user, host, imageUrl)
                    // and not the grouped host data returned by fetchAssignments.
                    // The `fetchAssignments` API groups data by host.
                    // So, we need to iterate through `assignedUsers` to find the correct one.

                    const hostId = hostAssignment._id; // This is the host's ID
                    const assignedUserIndex = hostAssignment.assignedUsers.findIndex(
                        user => user.userId === updatedAssignment.asign_user && hostId === updatedAssignment.host
                    );

                    if (assignedUserIndex !== -1) {
                        // Create a new array to ensure immutability
                        const updatedAssignedUsers = [...hostAssignment.assignedUsers];
                        updatedAssignedUsers[assignedUserIndex] = {
                            ...updatedAssignedUsers[assignedUserIndex],
                            assignmentImage: updatedAssignment.imageUrl // Update the image URL
                        };
                        return { ...hostAssignment, assignedUsers: updatedAssignedUsers };
                    }
                    return hostAssignment;
                });
                // toast.success('Assignment image updated successfully!'); // Add toast message here
            })
            .addCase(updateAssignmentImage.rejected, (state, action) => {
                toast.error(`Image update failed: ${action.error.message}`);
            });
    },
});

export default assignUserSlice.reducer;
