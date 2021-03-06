import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {formatDate} from '@functions';

import {uiDimen} from '@constants';
import {Space, ModalTodo} from '@components';

export type ListTodoProps = {
  todos: any[];
  doneTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  navigate: any;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  setTodoId: React.Dispatch<React.SetStateAction<string>>;
  todoId: string;
  setActionStatus: React.Dispatch<React.SetStateAction<string>>;
  actionStatus: string;
};

export const ListTodo = ({
  todos,
  doneTodo,
  setTodoId,
  todoId,
  removeTodo,
  navigate,
  setModalVisible,
  modalVisible,
  setActionStatus,
  actionStatus,
}: ListTodoProps) => {
  return (
    <View>
      {todos.length === 0 ? (
        <View>
          <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>
            Belum Ada Todo
          </Text>
        </View>
      ) : (
        todos.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigate('DetailTodo', {id: item.id});
            }}>
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <View>
                  <Text style={{fontWeight: 'bold', color: 'black'}}>
                    {item.name}
                  </Text>
                  <Text style={{fontWeight: '500'}}>
                    {formatDate(item.created_at)}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.status,
                    {
                      backgroundColor: item.is_done ? '#39A388' : '#1597E5',
                    },
                  ]}>
                  {item.is_done ? 'Selesai' : 'Pending'}
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
                    setTodoId(item.id);
                    setActionStatus('delete');
                  }}>
                  <Text style={[styles.actionButton, {backgroundColor: 'red'}]}>
                    Delete
                  </Text>
                </TouchableOpacity>
                <Space width={uiDimen.medium} />
                {!item.is_done && (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setTodoId(item.id);
                      setActionStatus('done');
                    }}>
                    <Text
                      style={[
                        styles.actionButton,
                        {backgroundColor: '#39A388'},
                      ]}>
                      Done
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <Space height={uiDimen.medium} />
            <ModalTodo
              actionStatus={actionStatus}
              doneTodo={doneTodo}
              removeTodo={removeTodo}
              todoId={todoId}
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
            />
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

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
