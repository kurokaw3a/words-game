/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themes: JSON.parse(localStorage.getItem('theme')) || {
    day: true,
    night: false,
  },
}
export const GameSlice = createSlice({
  name: 'words-game',
  initialState,
  reducers: {
    changeTheme(state, action) {
      if (action.payload === 'night') {
        state.themes.night = true
        state.themes.day = false
        localStorage.setItem('theme', JSON.stringify(state.themes))
      }
      if (action.payload === 'day') {
        state.themes.day = true
        state.themes.night = false
        localStorage.setItem('theme', JSON.stringify(state.themes))
      }
    },
  },
})
