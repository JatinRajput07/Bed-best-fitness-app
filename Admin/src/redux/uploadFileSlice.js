import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '@/configs/Axios';

export const uploadFile = createAsyncThunk('files/upload', async (file, { dispatch }) => {
  const formData = new FormData();
  formData.append('video', file);
  try {
    const response = await Axios.post(`/admin/upload-file`, formData, {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        dispatch(updateProgress(progress));
      },
    });
    return response.data.data[0].path;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
}
);

const uploadFileSlice = createSlice({
  name: 'uploadFiles',
  initialState: {
    progress: 0,
    error: null,
    filePath: null,
  },
  reducers: {
    resetProgress: (state) => {
      state.progress = 0;
      state.error = null;
      state.filePath = null;
    },
    updateProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.progress = 0;
        state.error = null;
        state.filePath = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.filePath = action.payload;
        state.error = null;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.error = action.error.message;
        state.progress = 0;
      });
  },
});

export const { resetProgress, updateProgress } = uploadFileSlice.actions;
export default uploadFileSlice.reducer;
