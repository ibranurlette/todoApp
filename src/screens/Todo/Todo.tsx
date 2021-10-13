import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList, HomeBottomTabParamList} from '@navigation';
import {useAppSelector} from '@redux';
import {Space} from '@components';
import {uiDimen} from '@constants';

export type TodoScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'HomeBottomTab'
> &
  NativeStackNavigationProp<HomeBottomTabParamList, 'Todo'>;

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

export type listCardProps = {
  todo: any;
};
export const ListCard = ({todo}: listCardProps) => (
  <View style={styles.cardContainer}>
    <View style={styles.card}>
      <View>
        <Text style={{fontWeight: 'bold'}}>{todo.name}</Text>
        <Text style={{fontWeight: '500'}}>{todo.date}</Text>
      </View>
      <Text
        style={[
          styles.status,
          {
            backgroundColor: todo.status === 'selesai' ? '#39A388' : '#1597E5',
          },
        ]}>
        {todo.status}
      </Text>
    </View>
  </View>
);

export const TodoScreen = () => {
  const navigation = useNavigation<TodoScreenNavigationProps>();
  const [activeTab, onChangeTab] = useState<number>(0);
  const [status, onStatus] = useState<boolean>(false);

  return (
    <SafeAreaView>
      <View style={{margin: uiDimen.large}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            onPress={() => {
              onChangeTab(0);
              onStatus(true);
            }}
            style={{
              backgroundColor: '#1597E5',
              padding: uiDimen.small,
            }}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onChangeTab(1);
              onStatus(true);
            }}
            style={{
              backgroundColor: '#1597E5',
              padding: uiDimen.small,
            }}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>Selesai</Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: '#1597E5', width: '100%', height: 5}} />

        <Space height={uiDimen.large} />
        {listTodo.map((item, index) => {
          if (activeTab === 0 && item.status === 'pending') {
            return (
              <View key={index}>
                <ListCard todo={item} />
                <Space height={uiDimen.medium} />
              </View>
            );
          }
          if (activeTab === 1 && item.status === 'selesai') {
            return (
              <View key={index}>
                <ListCard todo={item} />
                <Space height={uiDimen.medium} />
              </View>
            );
          }
        })}
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
