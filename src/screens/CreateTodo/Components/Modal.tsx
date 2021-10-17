import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {uiDimen} from '@constants';
import {Space} from '@components';

export type ModalTodoProps = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  removeTodo: (id: string) => void;
  todoId: string;
};
export const ModalTodo = ({
  setModalVisible,
  modalVisible,
  removeTodo,
  todoId,
}: ModalTodoProps) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Hapus Todo</Text>
            <View style={{padding: 20}}>
              <Text style={styles.modalText}>Apakah Kamu Yakin ?</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonRemove]}
                onPress={() => removeTodo(todoId)}>
                <Text style={styles.textStyle}>Yakin</Text>
              </TouchableOpacity>
              <Space height={uiDimen.medium} />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Tidak</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: uiDimen.small,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#1597E5',
  },
  buttonRemove: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
