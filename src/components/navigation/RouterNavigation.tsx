import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {RootStackNavigation} from './RootStackNavigation';

export const RouterNavigation = () => {
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};
