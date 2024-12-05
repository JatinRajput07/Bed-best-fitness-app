import { configureStore } from '@reduxjs/toolkit';
import uploadFileReducer from './uploadFileSlice'; 
import videoReducer from './videoSlice'; 
import userReducer from './userSlice'; 
import cmsSlice from './cmsSlice'; 
import assignments from './assignUserSlice'; 
import authReducer from './authSlice'; 


const store = configureStore({
  reducer: {
    videos: videoReducer,
    users: userReducer,
    cms: cmsSlice,
    uploadFiles: uploadFileReducer,
    assignments:assignments,
    auth: authReducer,

  },
});

export default store;
