/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themes: JSON.parse(localStorage.getItem('theme')) || {
    day: true,
    night: false,
  },
  lang: JSON.parse(localStorage.getItem('lang')) || {
    en: true,
    ru: false,
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
    changeLang(state, action) {
      if (action.payload === 'en') {
        state.lang.en = true
        state.lang.ru = false
        localStorage.setItem('lang', JSON.stringify(state.lang))
      }
      if (action.payload === 'ru') {
        state.lang.en = false
        state.lang.ru = true
        localStorage.setItem('lang', JSON.stringify(state.lang))
      }
    },
  },
})
