import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchDetailTodoAPI} from '@API';

export const fetchDetailTodoThunk = createAsyncThunk(
  'todos/detail-todo',
  async (id: any, thunkApi) => {
    try {
      const response = await fetchDetailTodoAPI(id);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);
