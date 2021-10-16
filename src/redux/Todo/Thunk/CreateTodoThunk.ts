import {createAsyncThunk} from '@reduxjs/toolkit';
import {createTodoAPI, CreateTodoDataArgs} from '@API';

export type CreateTodoThunkArg = {
  data: CreateTodoDataArgs;
};

export const createTodoThunk = createAsyncThunk(
  'todos/create-todo',
  async (arg: CreateTodoThunkArg, thunkApi) => {
    const {data} = arg;
    try {
      const response = await createTodoAPI(data);
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  },
);
