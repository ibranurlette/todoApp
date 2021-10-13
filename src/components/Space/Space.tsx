import React from 'react';
import {View} from 'react-native';

export type SpaceProps = {
  width?: number;
  height?: number;
};

export const Space = ({width = 0, height = 0}: SpaceProps) => {
  return <View style={{width: width, height: height}} />;
};
