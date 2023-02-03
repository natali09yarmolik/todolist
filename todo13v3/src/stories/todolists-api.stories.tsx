import React, {useEffect, useState} from 'react'

import {todolistAPI} from "../api/ todolist-api";
export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
     todolistAPI.getTodolist().then((res)=>{setState(res.data)})
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoName='REACT&REDUX'
        todolistAPI.createTodolist(todoName)
          .then((res)=>{setState(res.data)})
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId='76dd6f32-c790-48e3-9ad6-cc14bcb9b040'
        todolistAPI.deleteTodolist(todolistId)
             .then((res)=>{setState(res.data)})
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id='f960aff8-d87c-41cd-8cc4-921aa0c4b119'
        const todoName='REACT&JS'
        todolistAPI.updateTodolist(id, todoName).then((res)=>{setState(res.data)})

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
