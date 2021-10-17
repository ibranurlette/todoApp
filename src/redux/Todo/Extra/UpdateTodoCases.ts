import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {TodoInitialState} from '../InititalState';
import {updateTodoThunk} from '../Thunk';

export const updateTodoCases = (
  builder: ActionReducerMapBuilder<TodoInitialState>,
) => {
  builder.addCase(updateTodoThunk.pending, (state, _) => {
    state.isSubmitting = true;
    state.messageState = 'pending';
    state.message = 'Please wait';
    state.errors = null;
  });

  builder.addCase(updateTodoThunk.fulfilled, (state, action) => {
    state.todo = action.payload.data;
    state.isSubmitting = false;
    state.messageState = 'success';
    state.message = 'Successfully update Todo !';
  });

  builder.addCase(updateTodoThunk.rejected, (state, action) => {
    const {errors, message} = action.payload as any;

    state.isSubmitting = false;
    state.messageState = 'error';
    state.message = message;
    state.errors = errors;
  });
};
