import axios, { AxiosResponse ,AxiosRequestConfig} from 'axios';

const API = 'http://localhost:5000';

interface Todo {
  _id: string;
  todo: string;
  createdAt: string
}
interface CommonTodo{
  todo: string
}
interface deleteTodo {
  _id: string
}
interface editTodo{
  _id: string;
  todo: string;
}
export const GetTodo = async (): Promise<AxiosResponse<Todo[]>> => await axios.get(`${API}/todos/get`);
export const DeleteTodo = async (payload: deleteTodo): Promise<AxiosRequestConfig<string|null>> => await axios.delete(`${API}/todos/delete`,{data: {_id: payload._id}})
export const AddToDo = async (payload: CommonTodo): Promise<AxiosResponse<object| null>>=> await axios.post(`${API}/todos/add`,payload)
export const EditToDo = async (payload: editTodo): Promise<AxiosResponse<void>> => await axios.post(`${API}/todos/edit`,payload)

