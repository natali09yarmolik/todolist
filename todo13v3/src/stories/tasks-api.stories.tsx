import React, {ChangeEvent, useEffect, useState} from 'react'
import {taskAPI} from "../api/task-api";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState<any>('')
    const getTask = () => {
        taskAPI.getTask(todoID)
            .then((res) => {
                setState(res.data)
            })
    }
    return (<div>{JSON.stringify(state)}
        <input placeholder={'Todolist ID'}
               value={todoID}
               onChange={e => setTodoID(e.currentTarget.value)}/>
        <button onClick={getTask}>Get task</button>
    </div>)
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState<any>('')
    const [titleValue, setTitleValue] = useState<any>('')

    const createTask = () => {
        taskAPI.createTasks(todoID, titleValue)
            .then((res) => {
                setState(res.data)
            })
    }

    return (<div>{JSON.stringify(state)}
        <input placeholder={'Todolist ID'}
               value={todoID}
               onChange={e => setTodoID(e.currentTarget.value)}/>
        <input
            placeholder={'Title task'}
            value={titleValue}
            onChange={(e) => setTitleValue(e.currentTarget.value)}/>
        <button onClick={createTask}>Create task</button>
    </div>)
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState<any>('')
    const [taskID, setTaskID] = useState<any>('')

    const deleteTask = () => {
        taskAPI.deleteTask(todoID, taskID)
            .then((res) => {
                setState(res.data)
            })
    }

    return (<div>{JSON.stringify(state)}
        <input placeholder={'Todolist ID'}
               value={todoID}
               onChange={e => setTodoID(e.currentTarget.value)}/>
        <input
            placeholder={'Task ID'}
            value={taskID}
            onChange={(e) => setTaskID(e.currentTarget.value)}/>
        <button onClick={deleteTask}>Delete task</button>
    </div>)
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState<string>('')
    const [titleValue, setTitleValue] = useState<string>('')
    const [taskID, setTaskID] = useState<string>('')
    const [description, setDescription] = useState<string>('')
   // const [completed, setCompleted] = useState<boolean>(true)
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const updateTask = () => {
        taskAPI.updateTask(todoID,taskID, {
            title: titleValue,
            description: description,
            completed: true,
            status: status,
            priority: priority,
            startDate: '',
            deadline: ''
        })
            .then((res) => {
                setState(res.data)
            })
    }

    return (<div>{JSON.stringify(state)}
        <input placeholder={'Todolist ID'}
               value={todoID}
               onChange={e => setTodoID(e.currentTarget.value)}/>
        <input
            placeholder={'Task ID'}
            value={taskID}
            onChange={(e) => setTaskID(e.currentTarget.value)}/>
        <input
            placeholder={'New task title'}
            value={titleValue}
            onChange={(e) => setTitleValue(e.currentTarget.value)}/>
        <input
            placeholder={'New task description'}
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}/>

        <input
            placeholder={'New task status'}
            value={status}
            type={"number"}
            onChange={(e) => setStatus(+e.currentTarget.value)}/>

        <input
            placeholder={'New task priority'}
            value={priority}
            type={"number"}
            onChange={(e) => setPriority(+e.currentTarget.value)}/>

        <input
            placeholder={'New task startDate'}
            value={startDate}
            onChange={(e) => setStartDate(e.currentTarget.value)}/>

        <input
            placeholder={'New task deadline'}
            value={deadline}
            onChange={(e) => setDeadline(e.currentTarget.value)}/>



        <button onClick={updateTask}>Update task</button>
    </div>)

}
