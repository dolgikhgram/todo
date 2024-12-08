import { test, expect } from '@playwright/test';
import { userReducer } from "../src/state/user-reducer";

test('user reducer should increment only age', () => {
    const startState = {age:20, childrenCount:2, name:'Nikita'}
    const endState = userReducer(startState,{type:"INCREMENT-AGE"})
    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only children', () => {
    const startState = {age:20, childrenCount:2, name:'Nikita'}
    const endState = userReducer(startState,{type:"INCREMENT-CHILDREN-COUNT"})
    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
})

test('user reducer should changed name', () => {
    const startState = {age:20, childrenCount:2, name:'Nikita'}
    const newName = 'Viktor'
    const endState = userReducer(startState,{type:"CHANGE-NAME", newName: newName })
    expect(endState.name).toBe(newName)
})