import React from 'react';
import { FilterValuesType } from "../../../App"
import './Todolist.css'
import AddNewTask from '../../AddNewTask/AddNewTask';
import DeleteIcon from '@mui/icons-material/Delete';
import EditableSpan from '../../EditableSpan/EditableSpan';
import { Button, Checkbox, IconButton, Typography,Box} from '@mui/material';

export type TaskType = {
    id:string
    title:string
    isDone:boolean
}
type PropsType = {
    title:string
    tasks:Array<TaskType>
    removeTask: (id:string, todolistId:string)=> void
    changeFilter: (filter:FilterValuesType, todolistId:string)=> void
    addNewTask:(value:string,id:string)=>void
    changeChecked:(id:string,todolistId:string, isChecked: boolean)=>void
    filter:FilterValuesType
    id:string
    removeTodolist:(id:string)=>void
    changeTaskTitle:(taskId:string,todolistId:string, newValue:string)=>void
    changeTodolistTitle:(todolistId:string, newValue:string)=>void
}

export const Todolist = ({title,tasks,removeTask,changeFilter,addNewTask,changeChecked,filter, id,removeTodolist,changeTaskTitle,changeTodolistTitle}:PropsType)=>{
    
    const changeFilterAllHandler = () => {
        changeFilter('all',id)
    }
    const changeFilterActiveHandler = () => {
        changeFilter('active',id)
    }
    
    const changeFilterCompletedHandler = () => {
        changeFilter('completed',id)
    }

    const deleteTaskHandler = () =>{
        removeTodolist(id)
    }

    const addTask = (title:string)=>{
        addNewTask(title, id)
    }

    const onChangeTodolistTitelHandler = (newValue:string)=>{
        changeTodolistTitle(id,newValue)
    }

    return (
        <div>
            <div className='name-container'>
                <Typography variant="h6">
                    <EditableSpan 
                        title={title} 
                        isDone={false} 
                        onChange={onChangeTodolistTitelHandler}/>
                </Typography>
                <IconButton onClick={deleteTaskHandler}>
                    <DeleteIcon  fontSize="small" />
                </IconButton>
            </div>
            <AddNewTask addItem={addTask}/>
            <ul>
                {
                    tasks.map((task)=>{

                        const removeTaskHandler = () => {
                            removeTask(task.id,id)
                        }
                        const changeCheckedHandler = (value: boolean) =>{
                            changeChecked(task.id, id, value)
                        }
                        const onChangeTaskTitleHandler=(newValue:string)=>{
                            changeTaskTitle(task.id,id,newValue)
                        }

                        return (
                            <Box key={task.id}>
                                <Checkbox
                                color="success"
                                defaultChecked={task.isDone}
                                onChange={(e)=>changeCheckedHandler(e.target.checked)}
                                />
                                <EditableSpan title={task.title} 
                                isDone={task.isDone} 
                                onChange={onChangeTaskTitleHandler}/>
                                <IconButton onClick={removeTaskHandler}>
                                    <DeleteIcon  fontSize="small" />
                                </IconButton>
                            </Box>
                        )
                    })
                }
            </ul>
            <div>
                <Button onClick={changeFilterAllHandler} 
                    variant={filter==='all' ? 'contained' : 'text'}>
                    All
                </Button>
                <Button onClick={changeFilterActiveHandler}
                    color='success'
                    variant={filter==='active' ? 'contained' : 'text'}>
                    Active
                </Button>
                <Button onClick={changeFilterCompletedHandler}
                    color="secondary"
                    variant={filter==='completed' ? 'contained' : 'text'}>
                    Completed
                </Button>
            </div>
        </div>
    )
}




