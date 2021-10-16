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
