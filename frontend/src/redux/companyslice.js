import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
      singlecompany: null,
      companies: [],
      searchCompanyBytext:{},
    },
    reducers: {
      setsinglecompany: (state, action) => {
        state.singlecompany = action.payload;
      },
      setcompanies: (state, action) => {
        state.companies = action.payload;
      },
      setsearchCompanyBytext: (state, action) => {
        state.searchCompanyBytext = action.payload;
      },
    },
  });

export const { setsinglecompany, setcompanies,setsearchCompanyBytext } = companySlice.actions;
export default companySlice.reducer;
