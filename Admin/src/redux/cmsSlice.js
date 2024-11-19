import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../config/index';

export const fetchCms = createAsyncThunk(
  '/cms/fetch',
  async ({ title }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/admin/cms/${title}`);
      return response.data.cmsContent;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCms = createAsyncThunk('/cms/update', async ({ title, content }, { rejectWithValue }) => {

  try {
    const response = await Axios.patch(`/admin/cms/${title}`, { content: content });
    return response.data.cmsContent;
  } catch (error) {
    return rejectWithValue(error.message);
  }
}
);

export const fetchContactList = createAsyncThunk(
  '/contacts/fetch',
  async ({ page, searchQuery }, { rejectWithValue }) => {
    try {
      const response = await Axios.get('/admin/contacts', {
        params: {
          page,
          search: searchQuery,
          pageSize: 10,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cmsSlice = createSlice({
  name: 'cms',
  initialState: {
    loading: false,
    content: null,
    contacts: [],
    totalContacts: 0,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCms.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(fetchCms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCms.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCms.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(updateCms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchContactList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContactList.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.contacts;
        state.totalContacts = action.payload.totalRecords;
      })
      .addCase(fetchContactList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cmsSlice.reducer;
