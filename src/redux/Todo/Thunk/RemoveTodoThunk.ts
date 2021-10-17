import {createAsyncThunk} from '@reduxjs/toolkit';
import {removeTodoAPI} from '@API';

export const removeTodoThunk = createAsyncThunk(
  'todos/remove-todo',
  async (id: any, thunkApi) => {
    try {
      const response = await removeTodoAPI(id);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);
