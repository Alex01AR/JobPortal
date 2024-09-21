import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchQuery: "",
  },
  reducers: {
    setallJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setsingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setallAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setsearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setallAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setsearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setallJobs,
  setsingleJob,
  setallAdminJobs,
  setsearchJobByText,
  setallAppliedJobs,
  setsearchQuery,
} = jobSlice.actions;
export default jobSlice.reducer;
