import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',

  reducers: {
     setContactFilter: (_, { payload }) => payload,
  },
});

export const { setContactFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
