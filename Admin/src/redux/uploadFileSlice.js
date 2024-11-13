// uploadFileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../config/index'; // Assuming Axios is set up for API calls

// Async thunk for file uploads
export const uploadFile = createAsyncThunk('files/upload', async ({ file, type }) => {
  const formData = new FormData();
  formData.append(type, file);

  const response = await Axios.post(`videos/upload-file`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  return response.data;
});

const uploadFileSlice = createSlice({
  name: 'uploadFiles',
  initialState: {
    progress: 0,
    error: null,
  },
  reducers: {
    resetProgress: (state) => {
      state.progress = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.progress = 0; // Reset progress on new upload
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        // Handle successful upload, e.g., storing the returned URL
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { resetProgress } = uploadFileSlice.actions;

export default uploadFileSlice.reducer;
