import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '@/configs/Axios'; // Axios instance for API requests
import { utilService } from '../utilService'; // Assuming this exists for toast messages

// Async thunk for fetching videos with pagination and filters
export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos', // A more descriptive name for the thunk action type
  async (params, { rejectWithValue }) => { // Now accepts 'params'
    try {
      const response = await Axios.get(`/admin/video-list`, { params }); // Pass params to Axios
      // Return the data array, totalCount, AND the currentPage so the reducer knows whether to append or replace
      return {
        data: response.data.data,
        totalCount: response.data.totalCount,
        currentPage: params.page // Crucial for append/replace logic in reducer
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred fetching videos.';
      utilService.showErrorToast(errorMessage); // Show error toast
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for creating/uploading a new video
export const createVideo = createAsyncThunk(
  'videos/createVideo',
  async (formData, { rejectWithValue, dispatch }) => { // formData is now the FormData object
    try {
      const response = await Axios.post('/admin/upload-videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          dispatch(setProgress(percentCompleted)); // Dispatch a local action to update progress
        },
      });
      return response.data; // This will be { status: "success", media: { ... } }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to upload video.';
      utilService.showErrorToast(errorMessage); // Show error toast
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
    progress: 0,
    totalCount: 0, // Add totalCount to the state 
  },
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    resetProgress: (state) => {
      state.progress = 0;
      state.error = null;
    },
    // Removed updateProgress as setProgress serves the same purpose
  },
  extraReducers: (builder) => {
    // Handling the fetchVideos action states
    builder
      .addCase(fetchVideos.pending, (state, action) => {
        // Only clear videos and show main loading spinner for the first page
        // (initial load or new search/filter application)
        if (action.meta.arg.page === 1) {
          state.loading = true;
          state.videos = []; // Clear previous videos
          state.totalCount = 0; // Reset total count
        }
        state.error = null; // Clear previous errors
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        const { data, totalCount, currentPage } = action.payload;

        if (currentPage === 1) {
          // If it's the first page (initial load or new search/filter), replace existing videos
          state.videos = data;
        } else {
          // If it's a subsequent page (infinite scroll), append new videos
          state.videos = [...state.videos, ...data];
        }
        state.totalCount = totalCount; // Update total count
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message if failed
        // For rejected state, we typically don't clear videos unless we want to indicate no data
        // state.videos = []; // You might want to clear videos on error, depends on UX
      });

    // Handling the createVideo action states
    builder
      .addCase(createVideo.pending, (state) => {
        state.loading = true;
        state.progress = 0;
        state.error = null; // Clear any previous errors before a new upload
      })
      .addCase(createVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = 100; // Ensure progress is 100% on success
        // Prepend the new video to the list to show it immediately at the top
        // action.payload is { status: "success", media: { ... } }
        state.videos = [action.payload.media, ...state.videos]; // Correctly add the 'media' object
        state.totalCount += 1; // Increment totalCount as a new video is added
      })
      .addCase(createVideo.rejected, (state, action) => {
        state.loading = false;
        state.progress = 0;
        state.error = action.payload; // Set error for createVideo
      });
  },
});

export const { setProgress, resetProgress } = videoSlice.actions; // Export setProgress
export default videoSlice.reducer;
