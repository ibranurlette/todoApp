import {API} from '../axios';

export type CreateTodoDataArgs = {
  name: string;
  description: string;
};

export async function createTodoAPI(data: CreateTodoDataArgs) {
  try {
    const response = await API.post('/todo', data);
    return response;
  } catch (err) {
    console.log({err});
    throw err.response.data;
  }
}

export async function fetchTodoAPI() {
  try {
    const response = await API.get('/todo');
    return response;
  } catch (err) {
    throw err.response.data;
  }
}

export async function fetchDetailTodoAPI(id: any) {
  try {
    const response = await API.get(`/todo/${id}`);
    return response;
  } catch (err) {
    throw err.response.data;
  }
}
export async function removeTodoAPI(id: any) {
  try {
    const response = await API.delete(`/todo/${id}`);
    return response;
  } catch (err) {
    throw err.response.data;
  }
}
export async function updateStatusTodoAPI(id: any) {
  try {
    const response = await API.patch(`/todo/${id}`);
    return response;
  } catch (err) {
    throw err.response.data;
  }
}
