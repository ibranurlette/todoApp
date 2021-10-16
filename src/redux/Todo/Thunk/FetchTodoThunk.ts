import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchTodoAPI} from '@API';

export const fetchTodoThunk = createAsyncThunk('todos/list-todo', async () => {
  try {
    const response = await fetchTodoAPI();
    return response.data;
  } catch (err) {
    return err;
  }
});
