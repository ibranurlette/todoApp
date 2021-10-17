import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList, HomeBottomTabParamList} from '@navigation';
import {uiDimen} from '@constants';
import {Space} from '@components';
import {
  useAppDispatch,
  useAppSelector,
  CreateTodoThunkArg,
  createTodoThunk,
  fetchTodoThunk,
  removeTodoThunk,
  updateStatusTodoThunk,
} from '@redux';
import {ListTodo} from './Components';

export type CreateTodoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeBottomTab'
> &
  NativeStackNavigationProp<HomeBottomTabParamList, 'CreateTodoStack'>;

export const CreateTodoScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<CreateTodoScreenNavigationProp>();
  const {errors, todo} = useAppSelector(state => state.todo);
  const [todos, setTodos] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [todoId, setTodoId] = useState<string>('');
  const [actionStatus, setActionStatus] = useState<string>('');

  const createTodo = async () => {
    try {
      const arg: CreateTodoThunkArg = {
        data: {
          name: name,
          description: description,
        },
      };

      await dispatch(createTodoThunk(arg));
    } catch (error) {
      console.log({error});
    }

    // ! createa data just with react hooks
    // if (name === '') {
    //   setError('Todo tidak boleh kosong');
    // } else {
    //   const newTodos = [
    //     ...todos,
    //     {name, date: new Date().toDateString(), isDone: false},
    //   ];
    //   setTodos(newTodos);
    //   setError('');
    // }
  };
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

    // ! doneTodo data just with react hooks
    // const newTodos = [...todos];
    // newTodos[index].isDone = true;
    // setTodos(newTodos);
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
    // ! remove data just with react hooks
    // const newTodos = [...todos];
    // newTodos.splice(index, 1);
    // setTodos(newTodos);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{margin: uiDimen.large}}>
          <Text style={styles.label}>Masukkan todo anda</Text>
          <Space height={uiDimen.medium} />
          <TextInput
            placeholder="Masukkan nama todo"
            value={name}
            style={styles.input}
            onChangeText={value => {
              setName(value);
            }}
          />
          <Space height={uiDimen.medium} />
          {errors && (
            <>
              <Text style={{color: 'red', fontWeight: 'bold', fontSize: 15}}>
                {errors.name}
              </Text>
              <Space height={uiDimen.medium} />
            </>
          )}
          <TextInput
            placeholder="Masukkan deskripsi todo"
            value={description}
            style={styles.input}
            multiline
            numberOfLines={5}
            onChangeText={value => {
              setDescription(value);
            }}
          />
          <Space height={uiDimen.medium} />
          {errors && (
            <>
              <Text style={{color: 'red', fontWeight: 'bold', fontSize: 15}}>
                {errors.description}
              </Text>
              <Space height={uiDimen.medium} />
            </>
          )}
          <TouchableOpacity style={styles.button} onPress={createTodo}>
            <Text style={styles.labelButton}>Simpan</Text>
          </TouchableOpacity>
          <Space height={uiDimen.large} />
          <Space height={uiDimen.large} />

          <ListTodo
            todos={todos}
            setTodoId={setTodoId}
            todoId={todoId}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            removeTodo={removeTodo}
            doneTodo={doneTodo}
            setActionStatus={setActionStatus}
            actionStatus={actionStatus}
            navigate={navigation.navigate}
          />
        </View>
      </ScrollView>
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
  labelButton: {color: 'white', textAlign: 'center', fontWeight: 'bold'},
});
