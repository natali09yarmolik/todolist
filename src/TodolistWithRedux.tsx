import React, {ChangeEvent, memo, useCallback} from 'react';

import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {FilterValuesType, TodolistType} from "./AppWithRedux";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reduser";
import {TodolistChangeFilterAC, TodolistChangeTitleAC, TodolistRemoveAC} from "./state/todolist-reduser";
import {Task} from "./Task";
import {TaskWithRedux} from "./TaskWithRedax";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
    }

export const TodolistWithRedux= memo(({todolist}: PropsType)=> {
    console.log('todolist')
    const{id, title, filter}=todolist

    let tasks=useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])
    const dispatch=useDispatch()

    const addTask =useCallback((title: string) => {
        dispatch(addTaskAC(title, id));}, [dispatch])

       const removeTodolist =useCallback(() => {
        dispatch(TodolistRemoveAC(id))
    }, [dispatch])

    const changeTodolistTitle =useCallback((title: string) => {
        dispatch(TodolistChangeTitleAC(id, title))
    }, [dispatch])


    const onAllClickHandler = useCallback(()=> dispatch(TodolistChangeFilterAC("all", id)), [dispatch])
    const onActiveClickHandler =useCallback(() => dispatch(TodolistChangeFilterAC("active", id)),[dispatch] )
    const onCompletedClickHandler =useCallback(() => dispatch(TodolistChangeFilterAC("completed", id)), [dispatch])

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone );
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone );
    }

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
                    return <TaskWithRedux key={t.id}
                                          todolistId={t.id}
                                          task={t}/>
                  })
            }
        </div>
        <div>
            <ButtonWithMemo title={'All'}
                            onAllClickHandler={onAllClickHandler}
                            color={'inherit'}
                            variant={filter === 'all' ? 'outlined' : 'text'}/>

            <ButtonWithMemo title={'Active'}
                            onAllClickHandler={onActiveClickHandler}
                            color={'primary'}
                            variant={filter === 'active' ? 'outlined' : 'text'}/>

            <ButtonWithMemo title={'Completed'}
                            onAllClickHandler={onCompletedClickHandler}
                            color={'secondary'}
                            variant={filter === 'completed' ? 'outlined' : 'text'}/>

        </div>
    </div>
})

type ButtonWithMemoType={
    title:string
    onAllClickHandler:()=>void
    color:'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    variant: 'text' | 'outlined' | 'contained'
}
const ButtonWithMemo=memo((props:ButtonWithMemoType)=>{
    return <Button variant={props.variant}
                   onClick={props.onAllClickHandler}
                   color={props.color}
    >{props.title}
    </Button>
})
