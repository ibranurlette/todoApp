import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {removeToken, useAppDispatch, useAppSelector} from '@redux';
import {HomeStackParamList, RootStackParamList} from '@components';

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeBottomTab'
> &
  NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const accountStore = useAppSelector(state => state.account);

  const handleLogout = () => {
    dispatch(removeToken());
  };

  return (
    <View>
      <Text style={{fontSize: 20}}>Home screen</Text>

      {!accountStore.token && (
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{padding: 16, backgroundColor: 'pink', marginTop: 40}}>
          <Text>Goto Login</Text>
        </TouchableOpacity>
      )}

      {accountStore.token && (
        <TouchableOpacity
          onPress={handleLogout}
          style={{padding: 16, backgroundColor: 'pink', marginTop: 40}}>
          <Text>Logout</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail')}
        style={{padding: 16, backgroundColor: 'pink', marginTop: 40}}>
        <Text>Goto ProductDetail</Text>
      </TouchableOpacity>
    </View>
  );
};
