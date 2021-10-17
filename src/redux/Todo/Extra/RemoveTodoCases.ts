import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {TodoInitialState} from '../InititalState';
import {removeTodoThunk} from '../Thunk';

export const removeTodoCases = (
  builder: ActionReducerMapBuilder<TodoInitialState>,
) => {
  builder.addCase(removeTodoThunk.pending, (state, _) => {
    state.isSubmitting = true;
    state.messageState = 'pending';
    state.message = 'Please wait';
    state.errors = null;
  });

  builder.addCase(removeTodoThunk.fulfilled, (state, action) => {
    state.todo = action.payload.data;
    state.isSubmitting = false;
    state.messageState = 'success';
    state.message = 'Successfully remove todo !';
  });

  builder.addCase(removeTodoThunk.rejected, (state, action) => {
    const {errors, message} = action.payload as any;

    state.isSubmitting = false;
    state.messageState = 'error';
    state.message = message;
    state.errors = errors.content;
  });
};
