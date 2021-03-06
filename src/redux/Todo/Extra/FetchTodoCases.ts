import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {TodoInitialState} from '../InititalState';
import {fetchTodoThunk} from '../Thunk';

export const fetchTodoCases = (
  builder: ActionReducerMapBuilder<TodoInitialState>,
) => {
  builder.addCase(fetchTodoThunk.pending, (state, _) => {
    state.isFetching = true;
    state.messageState = 'pending';
    state.message = 'Please wait';
    state.errors = null;
  });

  builder.addCase(fetchTodoThunk.fulfilled, (state, action) => {
    state.isFetching = false;
    state.messageState = 'success';
    state.message = 'Successfully get list todo !';
  });

  builder.addCase(fetchTodoThunk.rejected, (state, action) => {
    const {errors, message} = action.payload as any;

    state.isFetching = false;
    state.messageState = 'error';
    state.message = message;
    state.errors = errors.content;
  });
};
