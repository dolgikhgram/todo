import React, { useReducer} from 'react';
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

function AppWithRedux() {
  let todolistId1 = v1()
  let todolistId2 = v1()+'2'
  let [tasks, dispatchTaskReducer]=useReducer( tasksReducer,{
    [todolistId1]:[
      {id:'00', title:'CSS', isDone:true},
      {id:'01', title:'JS', isDone:true},
      {id:'02', title:'React', isDone:false},
      {id:'03', title:'Redux', isDone:false}
    ],
    [todolistId2]:[
      {id:'10', title:'Book', isDone:false},
      {id:'11', title:'Milk', isDone:true},
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

  const changeChecked= (id:string, todolistId:string, isChecked: boolean) =>{
    const action = changeCheckedTaskAC(todolistId,id, isChecked)
    dispatchTaskReducer(action)
  }

  
  const removeTask = (id:string,todolistId:string)=>{
    dispatchTaskReducer(removeTaskAC(todolistId,id))
  }

  const changeTaskTitle = (taskId:string,todolistId:string, newValue:string) =>{
    dispatchTaskReducer(changeTaskTitleAC(todolistId,taskId,newValue))
  }

  const changeTodolistTitle = (todolistId:string, newValue:string)=>{
    dispatchTodolistReducer(changeTodolistTitleAC(todolistId,newValue))
  }

  const changeFilter = (filter:FilterValuesType, todolistId:string)=>{
    dispatchTodolistReducer(changeNewFilterAC(todolistId,filter))
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
          <Grid item key={tl.title}>
            <Paper>
              <Todolist 
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


export default AppWithRedux;
