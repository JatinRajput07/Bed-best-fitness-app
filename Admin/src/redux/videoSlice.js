import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '@/configs/Axios';// Axios instance for API requests
import { utilService } from '../utilService';

// Async thunk for fetching videos by category
export const fetchVideos = createAsyncThunk(
  'admin/video-list',
  async (category, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/admin/video-list/${category}`);
      return response.data.videos; // Assuming 'videos' is the key in the response
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred.';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for creating a new video
export const createVideo = createAsyncThunk(
  'admin/upload-videos',
  async (data, { rejectWithValue }) => {
    try {
      const response = await Axios.post('/admin/upload-videos', data);
      utilService.showSuccessToast('Video created successfully!');
      return response.data.video; // Assuming 'video' is the key in the response
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred.';
      utilService.showErrorToast(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const videoSlice = createSlice({
  name: 'videos',
  initialState: {
    videos: [],
    loading: false,
    error: null,
  },
  reducers: {}, // You can add any sync reducers if needed
  extraReducers: (builder) => {
    // Handling the 'fetchVideos' action states
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
        state.videos = []; 
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handling the 'createVideo' action states
    builder
      .addCase(createVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos.push(action.payload); // Add the new video to the list
      })
      .addCase(createVideo.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default videoSlice.reducer;
