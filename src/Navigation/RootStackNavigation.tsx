import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import {LoginScreen, RegisterScreen} from '@screens';
import {HomeBottomTabNavigation} from './HomeBottomTabNavigation';

export type RootStackParamList = {
  HomeBottomTab: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigation = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen
        name="HomeBottomTab"
        component={HomeBottomTabNavigation}
      />
    </RootStack.Navigator>
  );
};
