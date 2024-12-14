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


export const createVideo = createAsyncThunk(
  'admin/upload-videos',
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('category', data.category);
      formData.append('description', data.description);
      formData.append('filetype', data.filetype); 
      formData.append('subcategories', JSON.stringify(data.subcategories)); 

      if (data.file) {
        formData.append('file', data.file);
      }


      if (data.filetype === 'audio' && data.audioThumbnail) {
        formData.append('audioThumbnail', data.audioThumbnail); 
      }

      const response = await Axios.post('/admin/upload-videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.video || response.data.audio;
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
    videos: [], // Ensure this is an array
    loading: false,
    error: null,
  },
  reducers: {}, // You can add any sync reducers if needed
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
      });
  },
});

export default videoSlice.reducer;
