import { tasksReducer } from './../src/state/tasks-reducer';
import { test, expect } from '@playwright/test';
import { TaskStateType, TodolistType } from '../src/App';
import { addTodolistAC, todolistsReducer } from '../src/state/todolists-reducer';




test('is should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodolistsState: Array<TodolistType> = []


    const action = addTodolistAC('new todolist')
    const endTasksState = tasksReducer(startTasksState,action)
    const endTodolistsState = todolistsReducer(startTodolistsState,action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id
    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})