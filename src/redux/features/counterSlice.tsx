import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
interface Todo {
    id: string,
    todo: string
}

interface TodoState {
    todos: Todo[]
}
const initialState:TodoState = {todos: []}

export const CounterSlice = createSlice(
    {
        name: 'todos',
        initialState,
        reducers: {
            AddTodo: (state, action:PayloadAction<Todo>)=>{ 
                state.todos.push(action.payload)
            },
            EditTodo: (state, action:PayloadAction<Todo>)=>{ 
                const newToDo = action.payload
                state.todos = state.todos.map((todo)=>
                todo.id === action.payload.id ? {id: newToDo.id, todo: newToDo.todo}: todo
                )
            },
            RemoveTodo: (state, action:PayloadAction<string>)=>{ 
                const idTodo = action.payload
                state.todos = state.todos.filter(todo => todo.id !== idTodo)
            }
        }
    }
);

export const {AddTodo,EditTodo,RemoveTodo} = CounterSlice.actions;
export default CounterSlice.reducer;