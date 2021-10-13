import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '@navigation';

export type RegisterScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

export const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProps>();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};
