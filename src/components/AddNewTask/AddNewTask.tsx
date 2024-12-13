import {IconButton, TextField} from "@mui/material"
import React,{useState,ChangeEvent,KeyboardEvent} from "react"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import  "./AddNewTask.css" 

type AddNewTaskPropsType = {
    addItem:(value:string)=>void
}


const AddNewTask  = React.memo(({addItem}:AddNewTaskPropsType)=>{
    const [newTask,setNewTask] = useState("")
    const [error,setError]=useState(false)
    const CreateNewTask = (value:string)=>{
        setNewTask(value)
        if (error) setError(false)
    }
    const onNewTitleChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        CreateNewTask(e.target.value)
    }
    const onEnterKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>)=>{
                    if (e.charCode === 13 ){
                        if (newTask.trim().length!==0) addItem(newTask)
                        else setError(true)
                        setNewTask('')
                    }
                }
    const addNewTaskHandler  = ()=>{
        if (newTask.trim().length!==0) addItem(newTask)
        else setError(true)
        setNewTask('')
    }
    return (
        <div>
                <TextField
                label="what needs to be done?"
                className="text-input"
                color="secondary"
                variant="standard"
                helperText={ error ?'Field is required' : ''}
                onChange={onNewTitleChangeHandler} 
                onKeyPress={onEnterKeyPressHandler}
                value={newTask}
                error={error}
                maxRows={4}
                />
                <IconButton onClick={addNewTaskHandler}>
                    <AddCircleOutlineIcon/>
                </IconButton>
            </div>
    )
})

export default AddNewTask