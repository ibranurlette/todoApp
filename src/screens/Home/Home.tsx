import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {HomeStackParamList, RootStackParamList} from '@navigation';
import {uiDimen} from '@constants';
import {Space} from '@components';

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeBottomTab'
> &
  NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const listTodo = [
  {
    name: 'todo 1',
    date: '20/10/2020',
    status: 'pending',
  },
  {
    name: 'todo 2',
    date: '20/10/2020',
    status: 'selesai',
  },
  {
    name: 'todo 3',
    date: '20/10/2020',
    status: 'pending',
  },
  {
    name: 'todo 4',
    date: '20/10/2020',
    status: 'selesai',
  },
];

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView>
      <View style={{margin: uiDimen.large}}>
        <Text style={{fontSize: 16, color: 'black'}}>Masukkan todo anda</Text>
        <Space height={uiDimen.medium} />
        <TextInput
          placeholder="Masukkan todo"
          style={{
            borderWidth: 1,
            borderRadius: uiDimen.small,
            paddingHorizontal: uiDimen.large,
          }}
          onChangeText={() => {}}
          value="main bola"
        />
        <Space height={uiDimen.medium} />
        <TouchableOpacity
          style={{
            backgroundColor: '#1597E5',
            padding: uiDimen.medium,
            borderRadius: uiDimen.small,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>Simpan</Text>
        </TouchableOpacity>
        <Space height={uiDimen.large} />
        <Space height={uiDimen.large} />

        {listTodo.map((item, index) => (
          <View key={index}>
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <View>
                  <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                  <Text style={{fontWeight: '500'}}>{item.date}</Text>
                </View>
                <Text
                  style={[
                    styles.status,
                    {
                      backgroundColor:
                        item.status === 'selesai' ? '#39A388' : '#1597E5',
                    },
                  ]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <Space height={uiDimen.medium} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#1597E5',
    padding: uiDimen.medium,
    borderRadius: uiDimen.small,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  status: {
    color: 'white',
    padding: uiDimen.small,
    borderRadius: uiDimen.small,
  },
});
