import { addTaskAC, changeCheckedTaskAC, changeTaskTitleAC, removeTaskAC, removeTaskCompletedAC, tasksReducer } from './../src/state/tasks-reducer';
import { test, expect } from '@playwright/test';
import { TaskStateType } from '../src/App';
import { addTodolistAC, removeTodolistAC, todolistsReducer } from '../src/state/todolists-reducer';

test('Remove task', () => {
    const startState: TaskStateType = {
        'todolistId1':[
            {id:'1', title:'CSS', isDone:true},
            {id:'2', title:'JS', isDone:true},
            {id:'3', title:'React', isDone:false},
            {id:'4', title:'Redux', isDone:false}
        ],
        'todolistId2':[
            {id:'1', title:'Book', isDone:false},
            {id:'2', title:'Milk', isDone:true},
        ]
    }

    const action = removeTaskAC('todolistId2','2')
    const endState = tasksReducer(startState,action)

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(1)
    expect(endState['todolistId2'].every(t=> t.id!=='2')).toBeTruthy()

})

test('Add new task', () => {
    const startState: TaskStateType = {
        'todolistId1':[
            {id:'1', title:'CSS', isDone:true},
            {id:'2', title:'JS', isDone:true},
            {id:'3', title:'React', isDone:false},
            {id:'4', title:'Redux', isDone:false}
        ],
        'todolistId2':[
            {id:'1', title:'Book', isDone:false},
            {id:'2', title:'Milk', isDone:true},
        ]
    }

    const action = addTaskAC('todolistId2','Bread')
    const endState = tasksReducer(startState,action)

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'].length).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('Bread')
    expect(endState['todolistId2'][0].isDone).toBe(false)

})

test('change Checked', () => {
    const startState: TaskStateType = {
        'todolistId1':[
            {id:'1', title:'CSS', isDone:true},
            {id:'2', title:'JS', isDone:true},
            {id:'3', title:'React', isDone:false},
            {id:'4', title:'Redux', isDone:false}
        ],
        'todolistId2':[
            {id:'1', title:'Book', isDone:false},
            {id:'2', title:'Milk', isDone:true},
        ]
    }

    const action = changeCheckedTaskAC('todolistId2','1',true)
    const endState = tasksReducer(startState,action)

    expect(endState['todolistId2'][0].isDone).toBeTruthy()
    expect(endState['todolistId1'][0].isDone).toBeTruthy()
})


test('change task title', () => {
    const startState: TaskStateType = {
        'todolistId1':[
            {id:'1', title:'CSS', isDone:true},
            {id:'2', title:'JS', isDone:true},
            {id:'3', title:'React', isDone:false},
            {id:'4', title:'Redux', isDone:false}
        ],
        'todolistId2':[
            {id:'1', title:'Book', isDone:false},
            {id:'2', title:'Milk', isDone:true},
        ]
    }

    const action = changeTaskTitleAC('todolistId2','1','Crown')
    const endState = tasksReducer(startState,action)

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'][0].title).toBe('Crown')
    expect(endState['todolistId1'][0].title).toBe('CSS')

})

test('new property new array should when new todolist is added', () => {
    const startState: TaskStateType = {
        'todolistId1':[
            {id:'1', title:'CSS', isDone:true},
            {id:'2', title:'JS', isDone:true},
            {id:'3', title:'React', isDone:false},
            {id:'4', title:'Redux', isDone:false}
        ],
        'todolistId2':[
            {id:'1', title:'Book', isDone:false},
            {id:'2', title:'Milk', isDone:true},
        ]
    }

    const action = addTodolistAC('title no matter')
    const endState = tasksReducer(startState,action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k=> k!=='todolistId1' && k!=='todolistId2')
    if (!newKey) throw Error ("new key should be added")
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('correct todolist should be removed', () => {
    const startState: TaskStateType = {
        'todolistId1':[
            {id:'1', title:'CSS', isDone:true},
            {id:'2', title:'JS', isDone:true},
            {id:'3', title:'React', isDone:false},
            {id:'4', title:'Redux', isDone:false}
        ],
        'todolistId2':[
            {id:'1', title:'Book', isDone:false},
            {id:'2', title:'Milk', isDone:true},
        ]
    }

    const action = removeTodolistAC('todolistId1')
    const endState = tasksReducer(startState, action)
    const keys  = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistId1']).toBeUndefined()
})

test('Clear completed tasks', () => {
    const startState: TaskStateType = {
        'todolistId1':[
            {id:'1', title:'CSS', isDone:true},
            {id:'2', title:'JS', isDone:true},
            {id:'3', title:'React', isDone:false},
            {id:'4', title:'Redux', isDone:false}
        ],
        'todolistId2':[
            {id:'1', title:'Book', isDone:false},
            {id:'2', title:'Milk', isDone:true},
        ]
    }

    const action = removeTaskCompletedAC('todolistId1')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(2)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t=> t.id!=='3')).toBeTruthy()
    expect(endState['todolistId2'].every(t=> t.id!=='4')).toBeTruthy()

})
