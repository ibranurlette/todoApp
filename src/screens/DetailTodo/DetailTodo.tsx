import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {useAppDispatch, fetchDetailTodoThunk, useAppSelector} from '@redux';
import {Space} from '@components';
import {uiDimen} from '@constants';

export type DetailTodoProps = {
  route: any;
};
export const DetailTodoScreen = ({route}: DetailTodoProps) => {
  const dispatch = useAppDispatch();
  const {id} = route.params;
  const {isFetching} = useAppSelector(state => state.todo);

  const [detail, setDetail] = useState<any>(null);

  const data = [
    {
      label: 'Nama Todo',
      value: detail && detail.name,
    },
    {
      label: 'Deskripsi',
      value: detail && detail.description,
    },
    {
      label: 'Status',
      value: detail && detail.is_done ? 'Selesai' : 'Pending',
      is_done: true,
    },
    {
      label: 'Tanggal Buat',
      value: detail && detail.created_at,
    },
  ];

  const fetchTodo = async () => {
    try {
      const res = await dispatch(fetchDetailTodoThunk(id));
      if (res.meta.requestStatus === 'fulfilled') {
        setDetail(res.payload.data);
      }
    } catch (error) {
      console.log({error});
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return isFetching ? (
    <View style={styles.isloading}>
      <ActivityIndicator size="large" color="#1597E5" />
    </View>
  ) : (
    <View style={{flex: 1, margin: uiDimen.large}}>
      <View style={styles.card}>
        {data.map((detail, index) => (
          <View key={index}>
            <Text style={styles.label}>{detail.label}</Text>
            <Text style={styles.value}>{detail.value}</Text>
            <Space height={uiDimen.medium} />
          </View>
        ))}
      </View>
      <Space height={uiDimen.large} />
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.labelButton}>Ubah</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  isloading: {flex: 1, justifyContent: 'center'},
  card: {
    backgroundColor: 'white',
    borderRadius: uiDimen.small,
    padding: uiDimen.medium,
  },
  label: {fontSize: 15, fontWeight: 'bold', color: 'black'},
  value: {fontSize: 15, fontWeight: '500'},
  button: {
    backgroundColor: '#FFB740',
    padding: uiDimen.medium,
    borderRadius: uiDimen.small,
  },
  labelButton: {color: 'white', textAlign: 'center', fontWeight: 'bold'},
});
