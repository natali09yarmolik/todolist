import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, memo, useCallback} from "react";
import {TaskType} from "./TodolistWithRedux";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reduser";



type TaskPropsType={
    todolistId:string
    task: TaskType


}
export const TaskWithRedux=memo(({task, todolistId}:TaskPropsType)=>{

let {id, isDone, title}=task
    console.log('task')
    const dispatch=useDispatch()

        const onClickHandler=()=>{dispatch(removeTaskAC(id, todolistId))}
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            dispatch(changeTaskStatusAC(id, newIsDoneValue, todolistId));
        }
        const onTitleChangeHandler = useCallback((newValue: string) => {
            dispatch(changeTaskTitleAC(id, newValue, todolistId)) ;
        },[dispatch])

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