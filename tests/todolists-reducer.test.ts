import { test, expect } from '@playwright/test';
import { addTodolistAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer,changeNewFilterAC } from "../src/state/todolists-reducer";
import { v1 } from 'uuid';
import { TodolistType } from '../src/App';

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1 , title:"what to learn", filter: "all"},
        {id: todolistId2, title:"what to buy", filter:"all"}
    ]

    const action = removeTodolistAC(todolistId1)
    const endState = todolistsReducer(startState, action)
    
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})
test('New Todolist', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()


    const startState: Array<TodolistType> = [
        {id: todolistId1 , title:"what to learn", filter: "all"},
        {id: todolistId2, title:"what to buy", filter:"all"}
    ]
    const title = 'Nikita works'

    const action = addTodolistAC(title)

    const endState = todolistsReducer(startState, action)
    expect(endState.length).toBe(3)
    expect(endState[0].filter).toBe('all')
    expect(endState[0].title).toBe(title)
})

test('CHANGE TODOLIST TITLE', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()


    const startState: Array<TodolistType> = [
        {id: todolistId1 , title:"what to learn", filter: "all"},
        {id: todolistId2, title:"what to buy", filter:"all"}
    ]
    const title = 'Nikita works'

    const action = changeTodolistTitleAC(todolistId1,title)

    const endState = todolistsReducer(startState, action)
    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(title)
})

test('CHANGE NEW FILTER', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()


    const startState: Array<TodolistType> = [
        {id: todolistId1 , title:"what to learn", filter: "all"},
        {id: todolistId2, title:"what to buy", filter:"all"}
    ]
    const filter = 'active'
    const action = changeNewFilterAC(todolistId1,filter)

    const endState = todolistsReducer(startState, action)
    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe(filter)
})

