import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  minExperience: 0,
  companyName: '',
  location: [],
 
  techStack: [],
  roles: [],
  minBasePay: '',
 
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setMinExperience: (state, action) => {
      state.minExperience = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setLocationP: (state, action) => {
      state.location = action.payload;
    },
    setTechStack: (state, action) => {
      state.techStack =action.payload;
    },
    setRole: (state, action) => {
      state.roles = action.payload;
    },
    setMinBasePay: (state, action) => {
      state.minBasePay = action.payload;
    },
  },
});

export const {
  setMinExperience,
  setCompanyName,
  setLocationP,

  setTechStack,
  setRole,
  setMinBasePay,
} = filtersSlice.actions;

export default filtersSlice.reducer;