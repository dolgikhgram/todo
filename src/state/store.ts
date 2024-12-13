import React from "react";
import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";

// type AppRootState ={
//     todolists:Array<TodolistType>
//     tasks:TaskStateType
// }

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type  AppRootState  = ReturnType<typeof  rootReducer>

export const store =  createStore(rootReducer)


//@ts-ignore
window.store  =  store