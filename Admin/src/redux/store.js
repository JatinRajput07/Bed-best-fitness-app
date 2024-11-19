import { configureStore } from '@reduxjs/toolkit';
import uploadFileReducer from './uploadFileSlice'; 
import videoReducer from './videoSlice'; 
import userReducer from './userSlice'; 
import cmsSlice from './cmsSlice'; 


const store = configureStore({
  reducer: {
    videos: videoReducer,
    users: userReducer,
    cms: cmsSlice,
    uploadFiles: uploadFileReducer,
  },
});

export default store;
