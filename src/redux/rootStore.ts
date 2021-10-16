import {configureStore} from '@reduxjs/toolkit';
import {accountReducer} from './accountReducer';
import {todoReducer} from './Todo/todo';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    todo: todoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
