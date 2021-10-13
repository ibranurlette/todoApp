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

import {RootStackParamList, HomeBottomTabParamList} from '@navigation';
import {uiDimen} from '@constants';
import {Space} from '@components';

export type CreateTodoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeBottomTab'
> &
  NativeStackNavigationProp<HomeBottomTabParamList, 'CreateTodoStack'>;

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

export const CreateTodoScreen = () => {
  const navigation = useNavigation<CreateTodoScreenNavigationProp>();

  return (
    <SafeAreaView>
      <View style={{margin: uiDimen.large}}>
        <Text style={styles.label}>Masukkan todo anda</Text>
        <Space height={uiDimen.medium} />
        <TextInput
          placeholder="Masukkan todo"
          style={styles.input}
          onChangeText={() => {}}
          value="main bola"
        />
        <Space height={uiDimen.medium} />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.labelButton}>Simpan</Text>
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
  label: {fontSize: 16, color: 'black'},
  input: {
    borderWidth: 1,
    borderRadius: uiDimen.small,
    paddingHorizontal: uiDimen.large,
  },
  button: {
    backgroundColor: '#1597E5',
    padding: uiDimen.medium,
    borderRadius: uiDimen.small,
  },
  labelButton: {color: 'white', textAlign: 'center'},
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
