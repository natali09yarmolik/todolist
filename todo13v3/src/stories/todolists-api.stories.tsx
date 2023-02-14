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
        const todolistId='30cf2601-2bb7-451c-87d7-79652d19c352'
        todolistAPI.deleteTodolist(todolistId)
             .then((res)=>{setState(res.data)})
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id='17bc9a9b-f8fb-4f84-8d72-fc93fecf17ce'
        const todoName='What is your name?'
        todolistAPI.updateTodolist(id, todoName).then((res)=>{setState(res.data)})

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
