import React, { ChangeEvent, useState } from "react";
import './EditableSpan.css'
import { TextField } from "@mui/material";

type EditableSpanPropsType = {
    title:string
    isDone:boolean
    onChange:(newValue:string)=>void
}

const EditableSpan = ({title, isDone,onChange}:EditableSpanPropsType) =>{
    const [editMode, setEditMode] = useState(true)
    let [newValue, setnewValue] = useState('')
    const activateEditMode = ()  => {
        setEditMode(false)
        setnewValue(title)
    }
    const activateViewMode = ()  => {
        setEditMode(true)
        onChange(newValue)
    }
    
    const changeValueHandler = (e:ChangeEvent<HTMLInputElement>) => setnewValue(e.target.value)
    

    return (
        <>
            {
                editMode ? 
                <span 
                onDoubleClick={activateEditMode}
                className={isDone ? 'is-done' : ''}>
                    {
                        isDone ? <del>{title}</del> 
                        : title
                    }
                </span>  
                :
                <TextField
                value={newValue} 
                variant="standard"
                onChange={changeValueHandler}
                onBlur={activateViewMode}// событие onBlur возникает при потере элемента из фокуса
                autoFocus/>
            }
        </>
    )
}

export default EditableSpan
