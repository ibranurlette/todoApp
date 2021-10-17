import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {Space, ModalTodo} from '@components';
import {uiDimen} from '@constants';

export type listCardProps = {
  todo: any;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  setTodoId: React.Dispatch<React.SetStateAction<string>>;
  todoId: string;
  setActionStatus: React.Dispatch<React.SetStateAction<string>>;
  actionStatus: string;
  doneTodo?: (id: string) => void;
  removeTodo: (id: string) => void;
  navigate: any;
};

export const ListCard = ({
  todo,
  setModalVisible,
  modalVisible,
  setActionStatus,
  actionStatus,
  setTodoId,
  todoId,
  doneTodo,
  removeTodo,
  navigate,
}: listCardProps) => (
  <TouchableOpacity
    onPress={() => {
      navigate('DetailTodo', {id: todo.id});
    }}>
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
      <Space height={uiDimen.medium} />
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
            setTodoId(todo.id);
            setActionStatus('delete');
          }}>
          <Text style={[styles.actionButton, {backgroundColor: 'red'}]}>
            Delete
          </Text>
        </TouchableOpacity>
        <Space width={uiDimen.medium} />
        {!todo.is_done && (
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
              setTodoId(todo.id);
              setActionStatus('done');
            }}>
            <Text style={[styles.actionButton, {backgroundColor: '#39A388'}]}>
              Done
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
    <ModalTodo
      actionStatus={actionStatus}
      doneTodo={doneTodo}
      removeTodo={removeTodo}
      todoId={todoId}
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
