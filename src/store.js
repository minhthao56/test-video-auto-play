import {createSlice, configureStore} from '@reduxjs/toolkit';

const videoPlayingSlice = createSlice({
  name: 'videoPlaying',
  initialState: {
    id: -1,
  },
  reducers: {
    doPushIdVideoPlaying: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const {doPushIdVideoPlaying} = videoPlayingSlice.actions;

export const store = configureStore({
  reducer: videoPlayingSlice.reducer,
});
