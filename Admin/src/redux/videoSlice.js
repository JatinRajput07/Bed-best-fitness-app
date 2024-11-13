import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../config/index';

export const fetchVideos = createAsyncThunk('videos/fetchList', async () => {
  const response = await Axios.get('videos/list');
  return response.data.video;
});


export const createVideo = createAsyncThunk('videos/create', async (videoData) => {
  const response = await Axios.post('videos/upload', videoData);
  return response.data.video;
});


const videoSlice = createSlice({
  name: 'videos',
  initialState: {
    videos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default videoSlice.reducer;
