import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList, HomeBottomTabParamList} from '@navigation';
import {Space} from '@components';
import {uiDimen} from '@constants';
import {
  useAppDispatch,
  fetchTodoThunk,
  useAppSelector,
  updateStatusTodoThunk,
  removeTodoThunk,
} from '@redux';

import {ListCard} from './Components';

export type TodoScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'HomeBottomTab'
> &
  NativeStackNavigationProp<HomeBottomTabParamList, 'Todo'>;

export const TodoScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<TodoScreenNavigationProps>();
  const {todo} = useAppSelector(state => state.todo);
  const [activeTab, onChangeTab] = useState<number>(0);
  const [todos, setTodos] = React.useState<any[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [todoId, setTodoId] = useState<string>('');
  const [actionStatus, setActionStatus] = useState<string>('');

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

  const doneTodo = async (id: string) => {
    try {
      const res = await dispatch(updateStatusTodoThunk(id));
      if (res.meta.requestStatus === 'fulfilled') {
        setModalVisible(false);
      }
    } catch (error) {
      console.log({error});
    }
  };

  const removeTodo = async (id: string) => {
    try {
      const res = await dispatch(removeTodoThunk(id));
      if (res.meta.requestStatus === 'fulfilled') {
        setModalVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                  <ListCard
                    todo={item}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    setTodoId={setTodoId}
                    todoId={todoId}
                    actionStatus={actionStatus}
                    setActionStatus={setActionStatus}
                    doneTodo={doneTodo}
                    removeTodo={removeTodo}
                    navigate={navigation.navigate}
                  />
                  <Space height={uiDimen.medium} />
                </View>
              );
            }
            if (activeTab === 1 && item.is_done) {
              return (
                <View key={index}>
                  <ListCard
                    todo={item}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    setTodoId={setTodoId}
                    todoId={todoId}
                    actionStatus={actionStatus}
                    setActionStatus={setActionStatus}
                    removeTodo={removeTodo}
                    navigate={navigation.navigate}
                  />
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
