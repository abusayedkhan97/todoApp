import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";

const store = configureStore({
    reducer: {
        todo: todoReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
});

export default store;