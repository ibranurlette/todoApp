import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {TodoInitialState} from '../InititalState';
import {createTodoThunk} from '../Thunk';

export const createTodoCases = (
  builder: ActionReducerMapBuilder<TodoInitialState>,
) => {
  builder.addCase(createTodoThunk.pending, (state, _) => {
    state.isSubmitting = true;
    state.messageState = 'pending';
    state.message = 'Please wait';
    state.errors = null;
  });

  builder.addCase(createTodoThunk.fulfilled, (state, action) => {
    state.isSubmitting = false;
    state.messageState = 'success';
    state.message = 'Successfully Create Todo !';
  });

  builder.addCase(createTodoThunk.rejected, (state, action) => {
    const {errors, message} = action.payload as any;

    state.isSubmitting = false;
    state.messageState = 'error';
    state.message = message;
    state.errors = errors.content;
  });
};
