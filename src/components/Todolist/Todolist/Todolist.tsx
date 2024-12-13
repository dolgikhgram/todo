import React, { useCallback} from 'react';import './Todolist.css'
import AddNewTask from '../../AddNewTask/AddNewTask';
import DeleteIcon from '@mui/icons-material/Delete';
import EditableSpan from '../../EditableSpan/EditableSpan';
import { Button, Checkbox, IconButton, Typography,Box, Grid2} from '@mui/material';
import { useSelector } from 'react-redux';
import { AppRootState } from '../../../state/store';
import { useDispatch } from 'react-redux';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';import { addTaskAC, changeCheckedTaskAC, changeTaskTitleAC, removeTaskAC, removeTaskCompletedAC } from '../../../state/tasks-reducer';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';import { FilterValuesType, TaskStateType } from '../../../AppWithRedux';
export type TaskType = {
    id:string
    title:string
    isDone:boolean
}
type PropsType = {
    title:string
    changeFilter: (filter:FilterValuesType, todolistId:string)=> void
    filter:FilterValuesType
    id:string
    removeTodolist:(id:string)=>void
    changeTodolistTitle:(todolistId:string, newValue:string)=>void
}
export const Todolist = React.memo(({title, changeFilter,  filter, id, removeTodolist, changeTodolistTitle}:PropsType)=>{
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TaskStateType>(state=>state.tasks)
    let count=0
    const changeFilterAllHandler = () => {
        changeFilter('all',id)
    }
    const changeFilterActiveHandler = () => {
        changeFilter('active',id)
    }
    const deleteCompletedTaskHandler = () =>{
        dispatch(removeTaskCompletedAC(id))
    }
    const changeFilterCompletedHandler = () => {
        changeFilter('completed',id)
    }
    const deleteTaskHandler = () =>{
        removeTodolist(id)
    }
    const addTask = useCallback ((title:string)=>{
        dispatch(addTaskAC(id,title))
    },[])
    const onChangeTodolistTitelHandler = (newValue:string)=>{
        changeTodolistTitle(id,newValue)
    }
    let allTodolistTasks = tasks[id]
    let tasksForToDoList = allTodolistTasks
    if(filter==="completed"){
        tasksForToDoList=allTodolistTasks.filter((t:TaskType)=>{return t.isDone===true})
    }
    if(filter==="active"){
        tasksForToDoList=allTodolistTasks.filter((t:TaskType)=>{return t.isDone===false})
    }
    tasksForToDoList.map((el)=>{
        if(!el.isDone) count++
    })
    return (
        <div>
            <Box className='border-todolist-name'>
                <Box ml={1.5} className='name-container'>
                    <Typography variant="h6">
                        <AddNewTask addItem={addTask}/>
                    </Typography>
                    {/* <IconButton onClick={deleteTaskHandler}>
                        <DeleteIcon  fontSize="small" />
                    </IconButton> */}
                </Box>
            </Box>
            {/* <Box ml={1.5}>
                <AddNewTask addItem={addTask}/>
            </Box> */}
                {
                    tasksForToDoList.map((task:TaskType)=>{
                        const removeTaskHandler = () => {
                            dispatch(removeTaskAC(id,task.id))
                        }
                        const changeCheckedHandler = (e:any) =>{
                            dispatch(changeCheckedTaskAC(id,task.id, e.target.checked))
                        }
                        const onChangeTaskTitleHandler=(newValue:string)=>{
                            dispatch(changeTaskTitleAC(id,task.id,newValue))
                        }
                        return (
                            <Box key={task.id} className='task-container' >
                                <Checkbox
                                icon={<RadioButtonUncheckedIcon/>}
                                checkedIcon={<CheckCircleOutlineSharpIcon/>}
                                color="success"
                                checked={task.isDone}
                                onClick={(e)=>changeCheckedHandler(e)}
                                />
                                <EditableSpan 
                                title={task.title} 
                                isDone={task.isDone} 
                                onChange={onChangeTaskTitleHandler}/>
                                {/* <IconButton onClick={removeTaskHandler}>
                                    <DeleteIcon  fontSize="small" />
                                </IconButton> */}
                            </Box>
                        )
                    })
                }
            <div className='filters-container'>
                <Box mt={0.5}>
                    <Grid2 container spacing={1.5}>
                        <Box mt={1.5} ml={2}>
                            {count} items left
                        </Box>
                        <Box mt={1} ml={1}>
                            <Button onClick={changeFilterAllHandler}
                                size="small"
                                color='secondary' 
                                variant={filter==='all' ? 'outlined' : 'text'}>
                                All
                            </Button>
                            <Button onClick={changeFilterActiveHandler}
                                size="small"
                                color='secondary'
                                variant={filter==='active' ? 'outlined' : 'text'}>
                                Active
                            </Button>
                            <Button onClick={changeFilterCompletedHandler}
                                size="small"
                                color="secondary"
                                variant={filter==='completed' ? 'outlined' : 'text'}>
                                Completed
                            </Button>
                        </Box>
                        <Box mb={1} ml={1}>
                            <IconButton onClick={deleteCompletedTaskHandler}>
                                <DeleteIcon  fontSize="small" />
                                <Typography>Clear completed</Typography>
                            </IconButton>
                        </Box>
                    </Grid2>
                </Box>
            </div>
        </div>
    )
})