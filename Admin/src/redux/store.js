import { configureStore } from '@reduxjs/toolkit';
import uploadFileReducer from './uploadFileSlice'; 
import videoReducer from './videoSlice'; 


const store = configureStore({
  reducer: {
    videos: videoReducer,
    uploadFiles: uploadFileReducer,
  },
});

export default store;
