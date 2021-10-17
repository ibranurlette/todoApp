import React, {useState} from 'react';
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

import {RootStackParamList} from '@navigation';
import {
  useAppDispatch,
  useAppSelector,
  UpdateTodoThunkArg,
  updateTodoThunk,
} from '@redux';

import {uiDimen} from '@constants';
import {Space} from '@components';

export type UpdateTodoProps = {
  route: any;
};

export type UpdateTodoScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export const UpdateTodoScreen = ({route}: UpdateTodoProps) => {
  const dispatch = useAppDispatch();
  const {todoId, detail} = route.params;
  const navigation = useNavigation<UpdateTodoScreenNavigationProp>();
  const {errors} = useAppSelector(state => state.todo);
  const [name, setName] = useState<string>(detail.name);
  const [description, setDescription] = useState<string>(detail.description);

  const updateTodo = async () => {
    try {
      const arg: UpdateTodoThunkArg = {
        id: todoId,
        data: {
          name: name,
          description: description,
        },
      };

      const res = await dispatch(updateTodoThunk(arg));
      if (res.meta.requestStatus === 'fulfilled') {
        navigation.goBack();
      }
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <SafeAreaView>
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            updateTodo();
          }}>
          <Text style={styles.labelButton}>Simpan</Text>
        </TouchableOpacity>
        <Space height={uiDimen.large} />
        <Space height={uiDimen.large} />
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
  labelButton: {color: 'white', textAlign: 'center', fontWeight: 'bold'},
});
