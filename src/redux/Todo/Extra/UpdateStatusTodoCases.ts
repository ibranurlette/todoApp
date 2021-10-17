import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {TodoInitialState} from '../InititalState';
import {updateStatusTodoThunk} from '../Thunk';

export const updateStatusTodoCases = (
  builder: ActionReducerMapBuilder<TodoInitialState>,
) => {
  builder.addCase(updateStatusTodoThunk.pending, (state, _) => {
    state.isSubmitting = true;
    state.messageState = 'pending';
    state.message = 'Please wait';
    state.errors = null;
  });

  builder.addCase(updateStatusTodoThunk.fulfilled, (state, action) => {
    state.todo = action.payload.data;
    state.isSubmitting = false;
    state.messageState = 'success';
    state.message = 'Successfully update status todo !';
  });

  builder.addCase(updateStatusTodoThunk.rejected, (state, action) => {
    const {errors, message} = action.payload as any;

    state.isSubmitting = false;
    state.messageState = 'error';
    state.message = message;
    state.errors = errors.content;
  });
};
