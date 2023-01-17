import React, {ChangeEvent} from 'react';

import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {TodolistType} from "./AppWithRedux";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reduser";
import {TodolistChangeFilterAC, TodolistChangeTitleAC, TodolistRemoveAC} from "./state/todolist-reduser";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
    }

export function TodolistWithRedux({todolist}: PropsType) {
    const{id, title, filter}=todolist

    let tasks=useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])
    const dispatch=useDispatch()
    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id));

    }
    const removeTask = (taskID:string) => {
        dispatch(removeTaskAC(taskID, id))
    }
    const removeTodolist = () => {
        dispatch(TodolistRemoveAC(id))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(TodolistChangeTitleAC(id, title))
    }
    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone );
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone );
    }
    const onAllClickHandler = () => dispatch(TodolistChangeFilterAC("all", id))
    const onActiveClickHandler = () => dispatch(TodolistChangeFilterAC("active", id))
    const onCompletedClickHandler = () => dispatch(TodolistChangeFilterAC("completed", id))


    return <div>
        <h3> <EditableSpan value={title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler=()=>{removeTask(t.id)}
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, id));
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, id));
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>

                        <Checkbox checked={t.isDone}
                                  onChange={onChangeHandler}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}


