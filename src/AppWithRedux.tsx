import React, { useCallback } from 'react';
import './App.css';
import { TaskType, Todolist } from './components/Todolist/Todolist/Todolist';
import AddNewTask from './components/AddNewTask/AddNewTask';
import {Box, Container, Grid, Paper, Typography } from '@mui/material';
import { addTodolistAC, changeNewFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todolists-reducer';
import { useDispatch } from 'react-redux';
import { AppRootState } from './state/store';
import { useSelector } from 'react-redux';
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
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, Array<TodolistType>>(state=>state.todolists)

  const changeTodolistTitle =useCallback ((todolistId:string, newValue:string)=>{
    dispatch(changeTodolistTitleAC(todolistId,newValue))
  },[])
  const changeFilter = useCallback((filter:FilterValuesType, todolistId:string)=>{
    dispatch(changeNewFilterAC(todolistId,filter))
  },[])
  const addTodolist = useCallback((title:string)=>{
    dispatch(addTodolistAC(title))
  },[])
  const removeTodolist = useCallback ((id:string)=>{
    dispatch(removeTodolistAC(id))
  },[])
  return (
    <div className="App">
      <Box display={'flex'} justifyContent='center' m={3}>
        <Typography variant='h2' color='secondary'> todos</Typography>
      </Box>
      <Container fixed >
        {/* <div className='add-new-todolists'>
          <Box display={'flex'} justifyContent='center' m={3}>
            <Grid container justifyContent={'center'}>
              <AddNewTask addItem={addTodolist}/>
            </Grid>
          </Box>
        </div> */}
          <Grid container spacing={4} justifyContent={'center'}>
            {todolists.map((tl)=>{
              return (
                <Grid item mt={2.5}>
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
              })
            }
          </Grid>
        </Container>
    </div>
  );
}
export default AppWithReducers;