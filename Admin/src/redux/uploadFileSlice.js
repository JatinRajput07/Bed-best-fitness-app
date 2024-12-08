import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '@/configs/Axios';

export const uploadFile = createAsyncThunk('files/upload', async (file, { dispatch }) => {
  // Determine the file type dynamically
  const fileType = file.type.split("/")[0];
  let fileField;
  switch (fileType) {
    case "image":
      fileField = "image";
      break;
    case "audio":
      fileField = "audio";
      break;
    case "video":
      fileField = "video";
      break;
    default:
      throw new Error("Unsupported file type. Please upload an image, audio, or video file.");
  }

  console.log(file, "== File Info ==");
  const formData = new FormData();
  formData.append(fileField, file);

  try {
    const response = await Axios.post(`/admin/upload-file`, formData, {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        dispatch(updateProgress(progress));
      },
    });

    // Return the uploaded file's path from the response
    return response.data.data[0].path;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
});


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
