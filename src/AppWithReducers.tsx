import React, { useReducer, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './components/Todolist/Todolist/Todolist';
import { v1 } from 'uuid';
import AddNewTask from './components/AddNewTask/AddNewTask';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { MenuBook } from '@mui/icons-material';
import { addTodolistAC, changeNewFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './state/todolists-reducer';
import { addTaskAC, changeCheckedTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';

export type FilterValuesType ="all" | "completed" | "active"
export type TodolistType = {
  id:string
  title:string
  filter:FilterValuesType
}

export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducers() {
  let todolistId1 = v1()
  let todolistId2 = v1()
  let [tasks, dispatchTaskReducer]=useReducer( tasksReducer,{
    [todolistId1]:[
      {id:v1(), title:'CSS', isDone:true},
      {id:v1(), title:'JS', isDone:true},
      {id:v1(), title:'React', isDone:false},
      {id:v1(), title:'Redux', isDone:false}
    ],
    [todolistId2]:[
      {id:v1(), title:'Book', isDone:false},
      {id:v1(), title:'Milk', isDone:true},
    ]
  })

  let[todolist,dispatchTodolistReducer]= useReducer(todolistsReducer,[
    {id: todolistId1 , title:"what to learn", filter: "all"},
    {id: todolistId2, title:"what to buy", filter:"all"}
  ])  
  const addNewTask= (value:string, id:string) =>{
    const action = addTaskAC(id,value)
    dispatchTaskReducer(action)
  }

  const changeChecked= (id:string, todolistId:string) =>{
    const action = changeCheckedTaskAC(todolistId,id)
    dispatchTaskReducer(action)
  }

  
  const removeTask = (id:string,todolistId:string)=>{
    const action = removeTaskAC(todolistId,id)
    dispatchTaskReducer(action)
  }

  const changeTaskTitle = (taskId:string,todolistId:string, newValue:string) =>{
    const action = changeTaskTitleAC(todolistId,taskId,newValue)
    dispatchTaskReducer(action)
  }

  const changeTodolistTitle = (todolistId:string, newValue:string)=>{
    const action = changeTodolistTitleAC(todolistId,newValue)
    dispatchTodolistReducer(action)
  }

  const changeFilter = (filter:FilterValuesType, todolistId:string)=>{
    const action  = changeNewFilterAC(todolistId,filter)
    dispatchTodolistReducer(action)
  }
  const addTodolist = (title:string)=>{
    const action = addTodolistAC(title)
    dispatchTodolistReducer(action)
    dispatchTaskReducer(action)
  }
  const removeTodolist = (id:string)=>{
    const action = removeTodolistAC(id)
    dispatchTodolistReducer(action)
    dispatchTaskReducer(action)
  }
  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuBook/>
          </IconButton>
          <Typography variant='h6'>
            News
          </Typography>
          <Button color='inherit'>login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed >
        <div className='add-new-todolist'>
          <Grid container>
            <AddNewTask addItem={addTodolist}/>
          </Grid>
        </div>
        <Grid container spacing={5}>
        {todolist.map((tl)=>{
          let tasksForToDoList = tasks[tl.id]
          if(tl.filter==="completed"){
            tasksForToDoList=tasks[tl.id].filter((t:TaskType)=>{return t.isDone===true})
          }
        
          if(tl.filter==="active"){
            tasksForToDoList=tasks[tl.id].filter((t:TaskType)=>{return t.isDone===false})
          }
        return (
          <Grid item>
            <Paper>
              <Todolist 
              key={tl.id}
              title={tl.title} 
              tasks={tasksForToDoList} 
              removeTask={removeTask}
              changeFilter={changeFilter}
              addNewTask={addNewTask}
              changeChecked={changeChecked}
              filter={tl.filter}
              id={tl.id}
              removeTodolist={removeTodolist}
              changeTaskTitle={changeTaskTitle}
              changeTodolistTitle={changeTodolistTitle}/>
            </Paper>
          </Grid>
          )
      })}
      </Grid>
      </Container>
    </div>
  );
}


export default AppWithReducers;
