import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "../AppWithRedux"
export type  RemoveTodolistActionType={
    type: 'REMOVE-TODOLIST'
    id:string
}

export type AddTodolistActionType = {
    type: 'ADD-TOODOLIST'
    title:string
    todolistId:string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id:string
    title:string
}

export type ChangeNewFilterActionType = {
    type: 'CHANGE-NEW-FILTER'
    id:string
    filter:FilterValuesType
}

export type ActionsTypes  = RemoveTodolistActionType | ChangeTodolistTitleActionType | ChangeNewFilterActionType | AddTodolistActionType
export let todolistId1 = v1()
export let todolistId2 = v1()
const initialState: Array <TodolistType> = [
    {id: todolistId1 , title:"what needs to be done?", filter: "all"}
]
export const todolistsReducer = (state: Array <TodolistType> =  initialState, action: ActionsTypes): Array <TodolistType>  => {
    switch(action.type){
        case 'REMOVE-TODOLIST' :
            return [...state.filter((t) => {return (t.id!==action.id)})]
        case 'ADD-TOODOLIST' :
            return [{ 
                id:action.todolistId,
                title: action.title,
                filter:'all'
            },...state]
        case 'CHANGE-TODOLIST-TITLE' :
            if(action.title.trim().length!==0){
                state.map((el)=>{
                if (el.id===action.id){
                    el.title=action.title
                }
                })
            }
            return [...state]
        case 'CHANGE-NEW-FILTER' :
            state.map((e) => {
                if (e.id ===action.id){
                    e.filter = action.filter
                }
            })
            return [...state]
        default:
            return state
    }
}

export const removeTodolistAC  = (todolistId:string):RemoveTodolistActionType =>{
    return { type:'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title:string):AddTodolistActionType =>{
    return {type: 'ADD-TOODOLIST', title:title, todolistId:v1()}
}

export const changeTodolistTitleAC = (todolistId:string, title:string):ChangeTodolistTitleActionType =>{
    return {type: 'CHANGE-TODOLIST-TITLE',id: todolistId , title:title}
}

export const changeNewFilterAC = (todolistId:string,  filter:FilterValuesType):ChangeNewFilterActionType =>{
    return {type: 'CHANGE-NEW-FILTER',id: todolistId , filter:filter}
}