import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Profile {
  name: string;
  imageUrl: string;
}

interface AdditionalState {
  profiles: Profile[];
  user: string;
}

const initialState: AdditionalState = {
  profiles: [],
  user: "",
};

export const additionalSlice = createSlice({
  name: "additional",
  initialState,
  reducers: {
    addProfile: (state, action: PayloadAction<Profile>) => {
      state.profiles = [...state.profiles, action.payload];
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});

export const { addProfile, setUser } = additionalSlice.actions;
export default additionalSlice.reducer;
