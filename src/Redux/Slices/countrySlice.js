import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countryList: [],
  filter: "All",
};

const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    setCountryList: (state, action) => {
      state.countryList = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      console.log(action.payload,'action.payload');
      
    },
  },
});

export const { setCountryList, setFilter } = landingSlice.actions;
export default landingSlice.reducer;
