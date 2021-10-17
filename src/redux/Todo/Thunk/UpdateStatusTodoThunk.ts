import {createAsyncThunk} from '@reduxjs/toolkit';
import {updateStatusTodoAPI} from '@API';

export const updateStatusTodoThunk = createAsyncThunk(
  'todos/update-status-todo',
  async (id: any, thunkApi) => {
    try {
      const response = await updateStatusTodoAPI(id);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);
