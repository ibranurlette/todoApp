import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {TodoInitialState} from '../InititalState';
import {createTodoCases} from './CreateTodoCases';
import {fetchTodoCases} from './FetchTodoCases';
import {fetchDetailTodoCases} from './FetchDetailTodoCases';
import {removeTodoCases} from './RemoveTodoCases';
import {updateStatusTodoCases} from './UpdateStatusTodoCases';
import {updateTodoCases} from './UpdateTodoCases';

export const extraReducers = (
  builder: ActionReducerMapBuilder<TodoInitialState>,
) => {
  createTodoCases(builder);
  fetchTodoCases(builder);
  fetchDetailTodoCases(builder);
  removeTodoCases(builder);
  updateStatusTodoCases(builder);
  updateTodoCases(builder);
};
