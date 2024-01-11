import {GetTodo,DeleteTodo, AddToDo, EditToDo} from '..//..//api/api.tsx'
import React, { ChangeEvent, useState, ReactElement, useEffect } from "react"
import './home.css'
import { useDispatch } from "react-redux"
import { RemoveTodo} from "../../redux/features/counterSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faPen, faX } from "@fortawesome/free-solid-svg-icons"
import moment from 'moment'

// header tạo input và button để add todo
// tạo danh sách hiện todo gồm h2<danh sách todolist>
// thứ 2 lặp qua các todo rồi hiện ra 
// trong mỗi todo gồm title sửa xóa 

interface CommonTodo  {
  todo: string,
  _id: string,
  createdAt: string,
}

function Home(): ReactElement {
  const [todos, setToDos] = useState<Array<CommonTodo>>([])
  const dispatch = useDispatch()
  const [todolist, setTodolist] = useState<string>('');
  const [deleTodo,setDeLeToDo] = useState<boolean>(false)
  const [todoitem, setTodoItem] = useState<string>('');
  const [edit, setEdit] = useState<string|null>('');
  useEffect(() => {
    GetTodo().then((res) => {
    setToDos(res.data)
    });
  }, [todolist,edit,todoitem,deleTodo])
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(todos)
    if (todolist.trim() !== '') {
      AddToDo({todo: todolist.trim()})
      setTodolist('');
    }
  };

  const handleEdit = (todo: CommonTodo,index:string) => {
    setEdit(index)
    setTodoItem(todo.todo)
  };

  const handleRemove = (todo: CommonTodo) => {
    DeleteTodo(todo)
    dispatch(RemoveTodo(todo._id))
    setDeLeToDo(!deleTodo)
  };

  const handleInputToDo = (e: ChangeEvent<HTMLInputElement>) => setTodolist(e.target.value)
  const handleToDoItem = (e: ChangeEvent<HTMLInputElement>) => setTodoItem(e.target.value)
  
  const handleNewToDO =(todo: {todo: string, _id:string})=>{
    if(todoitem == '') return;
    EditToDo({todo: todoitem.trim(), _id: todo._id})
    setTodoItem(''); 
    setEdit(null); 

  }
 
  return (
    <>
    <div className="home">
      <section className="">
         {/* example about styled component */}
        <form onSubmit={handleSubmit} className="flex">
          <input value={todolist} type="text" className="w-96 h-full p-3" onChange={handleInputToDo} />
          <button className="py-3 px-8 h-full bg-blue-600 text-white ml-10 rounded-xl" type="submit">
            Add
          </button>
        </form>
        <ul className="flex mt-4 flex-col">
          {todos.map((todo, index) => (
            <li key={index} className="flex items-center bg-pink-300 w-full p-4 text-white mt-4">
              {edit === index.toString() ? (
                <input
                  type="text"
                  value={todoitem}
                  onChange={handleToDoItem}
                  className="text-black w-full p-1 border-none"
                />
                ) : (
                  <div className="text-lg mr-auto">{todo.todo}</div>
                  )}
                  <p>{moment(todo.createdAt).format('YYYY-MM-DD HH-MM-ss')}</p>
              <FontAwesomeIcon icon={faCheck} className="cursor-pointer text-lg ml-4" onClick={()=> handleNewToDO(todo)}/>
              <FontAwesomeIcon icon={faPen} className="p-3 cursor-pointer" onClick={() => handleEdit(todo, index.toString())} />
              <FontAwesomeIcon icon={faX} className="p-3 cursor-pointer" onClick={() => handleRemove(todo)} />
            </li>
          ))}
        </ul>
      </section>
    </div>
    </>
  );
}

export default Home;
