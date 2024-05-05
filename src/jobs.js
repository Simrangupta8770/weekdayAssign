// jobsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (index, { getState }) => {
    const limit = 10;
    const offset = index.index;
    console.log("limit" ,index);
    try {
      const res = await axios.post("https://api.weekday.technology/adhoc/getSampleJdJSON", { limit, offset });
      return res.data.jdList;
    } catch (error) {
      throw error;
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = [...state.jobs, ...action.payload];
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default jobsSlice.reducer;
