import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";

// fetch todos from api using Async thunk
export const fetchTodos = createAsyncThunk("todo/fetchTodos",async()=>{
    const response = await fetch("https://jsonplaceholder.typicode.com/todos")
    const data = await response.json()
    return data
})

// Async thunk for adding new todo
export const addTodoAsync = createAsyncThunk("todo/addTodoAsync",async(text)=>{
    const response = await fetch("https://jsonplaceholder.typicode.com/todos",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({text, completed:false})
    })
    const data = await response.json()
    return data
})

const todoSlice = createSlice({
    name: "todo",
    initialState:{
        todos:[],
        loading:false,
        status:"idle",
        error:null,
    },
    reducers:{
        toggleTodo:(state,action)=>{
            const todo = state.items.find((todo)=>todo.id === action.payload)
            if(todo){
                todo.completed = !todo.completed
            }
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTodos.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
          })
          .addCase(fetchTodos.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          // Handle addTodoAsync
          .addCase(addTodoAsync.fulfilled, (state, action) => {
            state.items.push(action.payload);
          });
    }

})

export const {toggleTodo} = todoSlice.actions
export default todoSlice.reducer