import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {DetailTodoScreen, UpdateTodoScreen} from '@screens';
import {HomeBottomTabNavigation} from './HomeBottomTabNavigation';

export type RootStackParamList = {
  HomeBottomTab: undefined;
  DetailTodo: undefined;
  UpdateTodo: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigation = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="HomeBottomTab"
        component={HomeBottomTabNavigation}
        options={{headerShown: false}}
      />

      <RootStack.Screen
        name="DetailTodo"
        component={DetailTodoScreen}
        options={{title: 'Detail Todo'}}
      />

      <RootStack.Screen
        name="UpdateTodo"
        component={UpdateTodoScreen}
        options={{title: 'Ubah Todo'}}
      />
    </RootStack.Navigator>
  );
};
