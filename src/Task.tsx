import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, memo, useCallback} from "react";
import {TaskType} from "./TodolistWithRedux";



type TaskPropsType={
    task: TaskType
    removeTask:(taskId:string)=>void
    changeTaskStatus:(id:string, isDone:boolean)=>void
    changeTaskTitle:(taskId:string, newTitle:string)=>void

}
export const Task=memo(({task,
                                   removeTask,
                                   changeTaskStatus,
                                   changeTaskTitle}:TaskPropsType)=>{

let {id, isDone, title}=task
    console.log('task')


        const onClickHandler=()=>{removeTask(id)}
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            changeTaskStatus(id, newIsDoneValue);
        }
        const onTitleChangeHandler = useCallback((newValue: string) => {
            changeTaskTitle(id, newValue);
        },[changeTaskTitle,id ])

    return(
        <div key={id} className={isDone ? "is-done" : ""}>

            <Checkbox checked={isDone}
                      onChange={onChangeHandler}/>
            <EditableSpan value={title} onChange={onTitleChangeHandler} />
            <IconButton onClick={onClickHandler}>
                <Delete />
            </IconButton>
        </div>
    )
})