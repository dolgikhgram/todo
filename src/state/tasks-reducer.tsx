import { v1 } from "uuid"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { TaskStateType } from "../App"

export type  ActionRemoveTaskType={
    type: 'REMOVE-TASK'
    todolistId:string
    taskId:string
}

export type ActionAddTaskType = {
    type: 'ADD-TASK'
    todolistId:string
    title:string
}

export type ChangeCheckedTaskActionType = {
    type: 'CHANGE-CHEKED-TASK'
    todolistId:string
    taskId:string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId:string, 
    taskId:string, 
    title:string
}


export type ActionsTypes  = ActionRemoveTaskType |  ActionAddTaskType |  ChangeCheckedTaskActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TaskStateType, action: ActionsTypes): TaskStateType => {
    switch(action.type){
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const filteredTasks = tasks.filter(t=>t.id!== action.taskId)
            stateCopy[action.todolistId]=filteredTasks
            return {...stateCopy}
        }
        case 'ADD-TASK':{
            if(action.title.trim().length!==0){
                const stateCopy = {...state}
                const tasks = stateCopy[action.todolistId]
                const newTask = {id:v1(), title:action.title, isDone:false}
                const newTasks = [newTask,...tasks]
                stateCopy[action.todolistId]=newTasks
                return stateCopy
            }
            return {...state}
        }
        case 'CHANGE-CHEKED-TASK':{
            let copyState ={...state}
            copyState[action.todolistId].map((el)=>{
                if(el.id===action.taskId){
                    if (el) {
                        el.isDone= !el.isDone
                        console.log(el)
                    }
                }
            })
            return copyState
        }

        case 'CHANGE-TASK-TITLE':{
            const copyState  = {...state}
            if(action.title.trim().length!==0){
                copyState[action.todolistId].map((el)=>{
                    if (el.id===action.taskId){
                    el.title=action.title
                    }
                })
            }
            return {...copyState}
        }

        case  'ADD-TOODOLIST':{
            const stateCopy = {...state}
            stateCopy[action.todolistId]=[]
            return stateCopy
        }

        case 'REMOVE-TODOLIST' : {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC  = (todolistId:string, taskId:string):ActionRemoveTaskType =>{
    return { type:'REMOVE-TASK', todolistId: todolistId, taskId: taskId}
}

export const addTaskAC = (todolistId:string, title:string):ActionAddTaskType =>{
    return {type: 'ADD-TASK',todolistId: todolistId , title:title}
}

export const changeCheckedTaskAC = (todolistId:string, taskId:string):ChangeCheckedTaskActionType =>{
    return {type: 'CHANGE-CHEKED-TASK',todolistId: todolistId , taskId:taskId}
}

export const  changeTaskTitleAC = (todolistId:string, taskId:string, title:string):ChangeTaskTitleActionType =>{
    return {type: 'CHANGE-TASK-TITLE',todolistId: todolistId , taskId:taskId, title:title}
}
