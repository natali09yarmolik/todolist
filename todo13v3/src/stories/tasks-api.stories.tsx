import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/task-api";

export default {
    title: 'API'
}

export const GetTodolistTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId='2941fda9-bc7c-4f88-b6bb-6ff4be27cc34'
     taskAPI.getTask(todoId).then((res)=>{setState(res.data)})
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId='2941fda9-bc7c-4f88-b6bb-6ff4be27cc34'
        const taskName='CSS'
        taskAPI.createTasks(todoId, taskName)
          .then((res)=>{setState(res.data)})
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId='2941fda9-bc7c-4f88-b6bb-6ff4be27cc34'
        const taskId='8b6bae7c-8d69-44f3-a276-0c6dddcf7a38'

        taskAPI.deleteTask(todolistId,taskId)
             .then((res)=>{setState(res.data)})
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId='2941fda9-bc7c-4f88-b6bb-6ff4be27cc34'
        const taskId='e614c05c-4443-4fbb-8183-1db47994acc8'
        const taskName='HTML'
        taskAPI.updateTask(todolistId,taskId,taskName).then((res)=>{setState(res.data)})

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
