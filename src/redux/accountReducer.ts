import {createSlice} from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: state => {
      state.token = null;
    },
  },
});

export const {setToken, removeToken} = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
