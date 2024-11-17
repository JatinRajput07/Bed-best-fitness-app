import { configureStore } from '@reduxjs/toolkit';
import uploadFileReducer from './uploadFileSlice'; 
import videoReducer from './videoSlice'; 
import userReducer from './userSlice'; 


const store = configureStore({
  reducer: {
    videos: videoReducer,
    users: userReducer,
    uploadFiles: uploadFileReducer,
  },
});

export default store;
