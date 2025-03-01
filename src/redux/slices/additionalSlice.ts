import { createSlice } from "@reduxjs/toolkit";

interface AdditionalState {}

const initialState: AdditionalState = {};
export const additionalSlice = createSlice({
  name: "additional",
  initialState,
  reducers: {},
});

export const {} = additionalSlice.actions;

export default additionalSlice.reducer;
