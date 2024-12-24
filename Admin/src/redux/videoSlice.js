import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '@/configs/Axios'; // Axios instance for API requests
import { utilService } from '../utilService';

// Async thunk for fetching videos by category
export const fetchVideos = createAsyncThunk('admin/video-list', async (_, { rejectWithValue }) => {
  try {
    const response = await Axios.get(`/admin/video-list`);
    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occurred.';
    return rejectWithValue(errorMessage);
  }
});

// Async thunk for creating/uploading a new video
export const createVideo = createAsyncThunk(
  'admin/upload-videos',
  async (data, { dispatch, rejectWithValue }) => {


    // console.log(data, '=========================videos=============================')

    try {
      const formData = new FormData();

      // Append all necessary fields to the FormData object
      formData.append('title', data.title);
      formData.append('category', data.category);
      formData.append('description', data.description);
      formData.append('filetype', data.filetype);  // This helps identify whether it's a video, audio, etc.
      formData.append('subcategories', data.subcategories?.value);  // Ensure subcategories is an array or object

      // Append the file(s) - video, audio, or both
      if (data.file) {
        formData.append('file', data.file);  // Video or audio file
      }

      // If there is an audio thumbnail (for audio files), add it to the formData
      if (data.audioThumbnail && data.audioThumbnail !== null) {
        formData.append('audioThumbnail', data.audioThumbnail);  // Audio thumbnail
      }

      // Make the API request to upload the video/audio
      const response = await Axios.post('/admin/upload-videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          dispatch(updateProgress(progress));
        },
      });

      return response.data.video || response.data.audio;  // Returning the uploaded video or audio details
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred.';
      utilService.showErrorToast(errorMessage);  // Show error toast for the user
      return rejectWithValue(errorMessage);  // Return error message in case of failure
    }
  }
);



const videoSlice = createSlice({
  name: 'videos',
  initialState: {
    videos: [], // Ensure this is an array
    loading: false,
    error: null,
    progress: 0,
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
  }, // You can add any sync reducers if needed
  extraReducers: (builder) => {
    // Handling the fetchVideos action states
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
        state.videos = []; // Clear previous videos
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload; // Set videos to the fetched list
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set error message if failed
      });

    // Handling the createVideo action states
    builder
      .addCase(createVideo.pending, (state) => {
        state.loading = true; // Show loading when creating a video
        state.progress = 0;
      })
      .addCase(createVideo.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.videos)) {
          state.videos.push(action.payload); // Add the new video to the list
        } else {
          state.videos = [action.payload]; // If not an array, reset as array with new video
        }
      })
      .addCase(createVideo.rejected, (state) => {
        state.loading = false; // Stop loading if the video creation failed
        state.progress = 0;
      });
  },
});


export const { resetProgress, updateProgress } = videoSlice.actions;
export default videoSlice.reducer;
