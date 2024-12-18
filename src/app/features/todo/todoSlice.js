import { createSlice } from "@reduxjs/toolkit";
import todoData from "../../../data";


export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todo: [],
        error: null,
        message: null,
        loader: false,
    },
    reducers: {
        todoDataLoad: (state)=>{
            state.todo = todoData;
        },
        createNewTodo: (state, action)=>{
            state.todo.push({...action.payload, id: Math.floor(Math.random() * 1000)})
        },
        deleteTodo: (state, action)=>{
            state.todo = state.todo.filter(data=>data.id != action.payload);
        },
        statusChange: (state, action) => {
            state.todo = state.todo.map((item) => 
              item.id === action.payload.id 
                ? { ...item, status: action.payload.status } 
                : item
            );
          }
          
    }
});
// export todo data load
export const {todoDataLoad, deleteTodo, createNewTodo, statusChange} = todoSlice.actions;

// export defult todo slice
export default todoSlice.reducer;