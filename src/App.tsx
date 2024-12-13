import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './components/Todolist/Todolist/Todolist';
import { v1 } from 'uuid';
import AddNewTask from './components/AddNewTask/AddNewTask';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { MenuBook } from '@mui/icons-material';

export type FilterValuesType ="all" | "completed" | "active"
export type TodolistType = {
  id:string
  title:string
  filter:FilterValuesType
}

export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todolistId1 = v1()
  let todolistId2 = v1()
  let [tasks, setTasks]=useState<TaskStateType>({
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

  let[todolist,setTodolist]= useState<Array <TodolistType>>([
    {id: todolistId1 , title:"what to learn", filter: "all"},
    {id: todolistId2, title:"what to buy", filter:"all"}
  ])  

  const changeChecked= (id:string, todolistId:string) =>{
    let currentTask = tasks[todolistId]
    let task = currentTask.find((el) => el.id===id)
    if (task)  task.isDone=!task.isDone
    setTasks({...tasks})
  }

  
  const removeTask = (id:string,todolistId:string)=>{
    tasks[todolistId]=tasks[todolistId].filter((t:TaskType) => {return (t.id!==id)})
    setTasks({...tasks})
  }

  const changeTodolistTitle = (todolistId:string, newValue:string)=>{
    if(newValue.trim().length!==0){
      todolist.map((el)=>{
        if (el.id===todolistId){
          el.title=newValue
        }
      })
      setTodolist([...todolist])
    }
  }

  const changeFilter = (filter:FilterValuesType, todolistId:string)=>{
    todolist.map((el) => {
      if (el.id===todolistId){
        el.filter=filter
        setTodolist([...todolist])
      }
    })
  }
  const addTodolist = (title:string)=>{
    let newTodolist :TodolistType ={
      id:v1(),
      title: title,
      filter:'all',
    } 
    setTodolist([newTodolist,...todolist])
    setTasks({...tasks,
      [newTodolist.id]:[]
    })
  }
  const removeTodolist = (id:string)=>{
    todolist=todolist.filter((el)=> el.id!==id)
    setTodolist([...todolist])
    delete tasks.id
    setTasks({...tasks})
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
              changeFilter={changeFilter}
              filter={tl.filter}
              id={tl.id}
              removeTodolist={removeTodolist}
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


export default App;
