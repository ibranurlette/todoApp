import {createSlice} from '@reduxjs/toolkit';
import {todoInitialState} from './InititalState';
import {extraReducers} from './Extra';

const todoSlice = createSlice({
  name: 'todos',
  initialState: todoInitialState,
  reducers: {},
  extraReducers,
});

export const todoReducer = todoSlice.reducer;
