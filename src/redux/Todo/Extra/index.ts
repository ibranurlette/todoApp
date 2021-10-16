import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {TodoInitialState} from '../InititalState';
import {createTodoCases} from './CreateTodoCases';
import {fetchTodoCases} from './FetchTodoCases';
import {fetchDetailTodoCases} from './FetchDetailTodoCases';

export const extraReducers = (
  builder: ActionReducerMapBuilder<TodoInitialState>,
) => {
  createTodoCases(builder);
  fetchTodoCases(builder);
  fetchDetailTodoCases(builder);
};
