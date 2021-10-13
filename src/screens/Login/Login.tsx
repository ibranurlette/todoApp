import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '@components';
import {setToken, useAppDispatch, useAppSelector} from '@redux';

export type LoginScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProps>();
  const {token} = useAppSelector(state => state.account);
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(setToken('secret_token'));
  };

  useEffect(() => {
    if (token) navigation.replace('HomeBottomTab');
  }, [token]);

  return (
    <View>
      <Text style={{fontSize: 20}}>Login Scren</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={{padding: 16, backgroundColor: 'pink', marginTop: 40}}>
        <Text>Go to Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        style={{padding: 16, backgroundColor: 'pink', marginTop: 40}}>
        <Text>Submit Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('HomeBottomTab')}
        style={{padding: 16, backgroundColor: 'pink', marginTop: 40}}>
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
});
