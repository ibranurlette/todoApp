import React, {useEffect} from 'react';
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
  CreateTodoThunkArg,
  createTodoThunk,
  fetchTodoThunk,
  useAppSelector,
} from '@redux';

export type CreateTodoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeBottomTab'
> &
  NativeStackNavigationProp<HomeBottomTabParamList, 'CreateTodoStack'>;

export const CreateTodoScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<CreateTodoScreenNavigationProp>();
  const {errors, todo} = useAppSelector(state => state.todo);
  const [todos, setTodos] = React.useState<any[]>([]);
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

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

  const doneTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
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

          {todos.length === 0 ? (
            <View>
              <Text
                style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>
                Belum Ada Todo
              </Text>
            </View>
          ) : (
            todos.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('DetailTodo', {id: item.id});
                }}>
                <View style={styles.cardContainer}>
                  <View style={styles.card}>
                    <View>
                      <Text style={{fontWeight: 'bold', color: 'black'}}>
                        {item.name}
                      </Text>
                      <Text style={{fontWeight: '500'}}>{item.created_at}</Text>
                    </View>
                    <Text
                      style={[
                        styles.status,
                        {
                          backgroundColor: item.isDone ? '#39A388' : '#1597E5',
                        },
                      ]}>
                      {item.isDone ? 'Selesai' : 'Pending'}
                    </Text>
                  </View>
                  <Space height={uiDimen.medium} />
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        removeTodo(index);
                      }}>
                      <Text
                        style={[styles.actionButton, {backgroundColor: 'red'}]}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                    <Space width={uiDimen.medium} />
                    <TouchableOpacity
                      onPress={() => {
                        doneTodo(index);
                      }}>
                      <Text
                        style={[
                          styles.actionButton,
                          {backgroundColor: '#39A388'},
                        ]}>
                        Done
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Space height={uiDimen.medium} />
              </TouchableOpacity>
            ))
          )}
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
  cardContainer: {
    borderWidth: 1,
    borderColor: '#1597E5',
    padding: uiDimen.medium,
    borderRadius: uiDimen.small,
  },
  actionButton: {
    color: 'white',
    padding: uiDimen.small,
    fontWeight: '500',
    borderRadius: uiDimen.small,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
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
