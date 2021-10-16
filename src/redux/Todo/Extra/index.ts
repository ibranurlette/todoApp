import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {TodoInitialState} from '../InititalState';
import {createTodoCases} from './CreateTodoCases';

export const extraReducers = (
  builder: ActionReducerMapBuilder<TodoInitialState>,
) => {
  createTodoCases(builder);
};
