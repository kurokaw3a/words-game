import { configureStore } from '@reduxjs/toolkit';
import { GameSlice } from './Game/Game';

export const store = configureStore({
  reducer: {
    game: GameSlice.reducer,
  },
})
