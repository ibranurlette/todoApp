import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {TodoInitialState} from '../InititalState';
import {fetchDetailTodoThunk} from '../Thunk';

export const fetchDetailTodoCases = (
  builder: ActionReducerMapBuilder<TodoInitialState>,
) => {
  builder.addCase(fetchDetailTodoThunk.pending, (state, _) => {
    state.isFetching = true;
    state.messageState = 'pending';
    state.message = 'Please wait';
    state.errors = null;
  });

  builder.addCase(fetchDetailTodoThunk.fulfilled, (state, action) => {
    state.isFetching = false;
    state.messageState = 'success';
    state.message = 'Successfully get detail todo !';
  });

  builder.addCase(fetchDetailTodoThunk.rejected, (state, action) => {
    const {errors, message} = action.payload as any;

    state.isFetching = false;
    state.messageState = 'error';
    state.message = message;
    state.errors = errors.content;
  });
};
