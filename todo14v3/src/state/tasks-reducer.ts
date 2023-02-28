import { TasksStateType } from '../App';

import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    TodolistType,
    UpdateTaskModelType
} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}
type SetTodoType=ReturnType<typeof setTodo>
type SetTaskType=ReturnType<typeof setTask>
type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodoType
    | SetTaskType

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASK":{
            const copyState={...state}
            copyState[action.todoID]=action.tasks
            return copyState
        }
        case "SET-TODO":{
            const copyState = {...state}
            action.todo.forEach((el)=> {
                copyState[el.id]=[]
            })
            return copyState
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks=stateCopy[action.task.todoListId]
            const newTasks=[action.task, ...tasks]
            stateCopy[action.task.todoListId]=newTasks
           /* const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistId, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
            const tasks = stateCopy[action.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;*/
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
             return {
                ...state,
                [action.todo.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTodo = (todo:TodolistType[]) => {
    return {type: 'SET-TODO', todo}as const
}
export const setTask = (tasks:TaskType[], todoID:string) => {
    return {type: 'SET-TASK',tasks, todoID }as const
}
export const setTaskThunk=(todoID:string) => (dispatch:Dispatch) => {
    todolistsAPI.getTasks(todoID).then((res)=>{
          const tasks = res.data.items
            dispatch(setTask(tasks,todoID))})
}
export const deleteTaskThunk=(todoID:string, taskID:string) => (dispatch:Dispatch) => {
    todolistsAPI.deleteTask(todoID, taskID).then((res)=>{
        dispatch(removeTaskAC(taskID, todoID))
    })
}
export const createTaskThunk=(todoID:string, title:string) =>
{return(dispatch:Dispatch)=>{
    todolistsAPI.createTask(todoID,title).then((res)=>{
        dispatch(addTaskAC(res.data.data.item))
    })
}

}

export const upDateTaskStatusThunk=(todoID:string, taskID:string, status:TaskStatuses) =>
    (dispatch:Dispatch, getState:()=>AppRootStateType) => {
    const allTasksFromState=getState().tasks
    const tasksForCurrentTodolist=allTasksFromState[todoID]
    const task=tasksForCurrentTodolist.find(el=>{
        return el.id===taskID
    })
        if(task){
            todolistsAPI.updateTask(todoID,taskID, {
                title: task.title,
                description: task.description,
                status: status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline

        }).then((res)=>{
        dispatch(changeTaskStatusAC(taskID,status,todoID))})}
}

export const changeTaskTitleThunk=(taskID: string, newTitle: string, todoID: string) =>
    (dispatch:Dispatch, getState:()=>AppRootStateType) => {
        const allTasksFromState=getState().tasks
        const tasksForCurrentTodolist=allTasksFromState[todoID]
        const task=tasksForCurrentTodolist.find(el=>{
            return el.id===taskID
        })
        if(task){
            todolistsAPI.updateTask(todoID,taskID, {
                title: newTitle,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline

            }).then((res)=>{
                dispatch(changeTaskTitleAC(taskID,newTitle,todoID))})}
    }