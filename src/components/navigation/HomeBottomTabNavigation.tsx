import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AccountScreen, HomeScreen} from '@screens';
import {HomeStackNavigation} from './HomeStackNavigation';

export type HomeBottomTabParamList = {
  HomeStack: undefined;
  Account: undefined;
};

const HomeBottomTab = createBottomTabNavigator<HomeBottomTabParamList>();

export const HomeBottomTabNavigation = () => {
  return (
    <HomeBottomTab.Navigator>
      <HomeBottomTab.Screen
        name="HomeStack"
        component={HomeStackNavigation}
        options={{headerShown: false}}
      />
      <HomeBottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={{headerShown: false}}
      />
    </HomeBottomTab.Navigator>
  );
};
