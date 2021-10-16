import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList, HomeBottomTabParamList} from '@navigation';
import {Space} from '@components';
import {uiDimen} from '@constants';
import {useAppDispatch, fetchTodoThunk, useAppSelector} from '@redux';

export type TodoScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'HomeBottomTab'
> &
  NativeStackNavigationProp<HomeBottomTabParamList, 'Todo'>;

export type listCardProps = {
  todo: any;
};

export const ListCard = ({todo}: listCardProps) => (
  <TouchableOpacity>
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View>
          <Text style={{fontWeight: 'bold'}}>{todo.name}</Text>
          <Text style={{fontWeight: '500'}}>{todo.created_at}</Text>
        </View>
        <Text
          style={[
            styles.status,
            {
              backgroundColor: todo.is_done ? '#39A388' : '#1597E5',
            },
          ]}>
          {todo.is_done ? 'Selesai' : 'Pending'}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

export const TodoScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<TodoScreenNavigationProps>();
  const {todo} = useAppSelector(state => state.todo);
  const [activeTab, onChangeTab] = useState<number>(0);
  const [todos, setTodos] = React.useState<any[]>([]);

  const fetchTodo = async () => {
    try {
      const res = await dispatch(fetchTodoThunk());
      if (res.meta.requestStatus === 'fulfilled') {
        setTodos(res.payload.data.data);
      }
    } catch (error) {
      console.log({error});
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [todo]);

  return (
    <SafeAreaView>
      <View style={{margin: uiDimen.large}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            onPress={() => {
              onChangeTab(0);
            }}
            style={{
              backgroundColor: activeTab === 0 ? '#1597E5' : 'white',
              padding: uiDimen.small,
            }}>
            <Text
              style={{
                fontWeight: activeTab === 0 ? 'bold' : 'normal',
                color: activeTab === 0 ? 'white' : 'black',
              }}>
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onChangeTab(1);
            }}
            style={{
              backgroundColor: activeTab === 1 ? '#1597E5' : 'white',
              padding: uiDimen.small,
            }}>
            <Text
              style={{
                fontWeight: activeTab === 1 ? 'bold' : 'normal',
                color: activeTab === 1 ? 'white' : 'black',
              }}>
              Selesai
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: '#1597E5', width: '100%', height: 5}} />

        <Space height={uiDimen.large} />
        <ScrollView>
          {todos.map((item, index) => {
            if (activeTab === 0 && !item.is_done) {
              return (
                <View key={index}>
                  <ListCard todo={item} />
                  <Space height={uiDimen.medium} />
                </View>
              );
            }
            if (activeTab === 1 && item.is_done) {
              return (
                <View key={index}>
                  <ListCard todo={item} />
                  <Space height={uiDimen.medium} />
                </View>
              );
            }
          })}
        </ScrollView>
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
