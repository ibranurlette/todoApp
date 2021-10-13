import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '@components';
import {HomeBottomTabParamList} from 'src/components/Navigation/HomeBottomTabNavigation';
import {useAppSelector} from '@redux';

export type AccountScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'HomeBottomTab'
> &
  NativeStackNavigationProp<HomeBottomTabParamList, 'Account'>;

export const AccountScreen = () => {
  const navigation = useNavigation<AccountScreenNavigationProps>();
  const {token} = useAppSelector(state => state.account);

  return (
    <View>
      <Text style={{fontSize: 20}}>Account screen</Text>

      {!token ? (
        <>
          <Text style={{fontSize: 16, marginTop: 20}}>
            You're not logged in
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{padding: 16, backgroundColor: 'pink', marginTop: 40}}>
            <Text>Goto Login</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={{fontSize: 16, marginTop: 20}}>Hi John</Text>
      )}
    </View>
  );
};
