import {createAsyncThunk} from '@reduxjs/toolkit';
import {updateTodoAPI, TodoDataArgs} from '@API';

export type UpdateTodoThunkArg = {
  id: any;
  data: TodoDataArgs;
};

export const updateTodoThunk = createAsyncThunk(
  'todos/update-todo',
  async (arg: UpdateTodoThunkArg, thunkApi) => {
    const {id, data} = arg;
    try {
      const response = await updateTodoAPI(id, data);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);
