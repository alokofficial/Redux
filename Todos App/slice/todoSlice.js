import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todo",
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
          state.push({ id: Date.now(), text: action.payload, completed: false });
        },
        removeTodo: (state, action) => {
          return state.filter((todo) => todo.id !== action.payload);
        },
        toggleTodo: (state, action) => {
          const todo = state.find((todo) => todo.id === action.payload);
          if (todo) {
            todo.completed = !todo.completed;
          }
        },
        updateTodo: (state, action) => {
          const { id, text } = action.payload;
          const todo = state.find((todo) => todo.id === id);
          if (todo) {
            todo.text = text;
          }
        },
      },
})

export const {addTodo, removeTodo, toggleTodo, updateTodo} = todoSlice.actions
export default todoSlice.reducer