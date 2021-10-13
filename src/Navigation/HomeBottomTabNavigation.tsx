import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TodoScreen, CreateTodoScreen} from '@screens';

export type HomeBottomTabParamList = {
  CreateTodoStack: undefined;
  Todo: undefined;
};

const HomeBottomTab = createBottomTabNavigator<HomeBottomTabParamList>();

export const HomeBottomTabNavigation = () => {
  return (
    <HomeBottomTab.Navigator>
      <HomeBottomTab.Screen
        name="CreateTodoStack"
        component={CreateTodoScreen}
        options={{title: 'Buat Todo'}}
      />
      <HomeBottomTab.Screen
        name="Todo"
        component={TodoScreen}
        options={{title: 'Daftar Todo'}}
      />
    </HomeBottomTab.Navigator>
  );
};
