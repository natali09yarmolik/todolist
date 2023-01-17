import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TodolistAddACType, TodolistRemoveACType} from "./todolist-reduser";


export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>


export type ActionsTypeTask = removeTaskACType | addTaskACType |
                   changeTaskStatusACType |
                   changeTaskTitleACType |
                   TodolistAddACType |
                   TodolistRemoveACType

let initialState:TasksStateType={}

export const tasksReducer = (state: TasksStateType=initialState, action: ActionsTypeTask):TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId]
                    .filter(el=>el.id!==action.taskId)}
        case "ADD-TASKS":
            let newTask={id: v1(), title: action.title, isDone: false}

            return {...state, [action.todolistId]:[newTask, ...state[action.todolistId]]}
        case "CHANGE-TASK-STATUS":{

            return {...state, [action.todolistId]: state[action.todolistId]
                .map(el=>el.id===action.id?{...el, isDone:action.isDone}: el)}
        }
              case "CHANGE-TASK-TITLE":
            return {...state, [action.todolistId]:state[action.todolistId]
                    .map(el=>el.id===action.taskId?{...el, title:action.newTitle} :el)}
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistId]:[]}
        case "REMOVE-TODOLIST":
            let copyState={...state}
            delete copyState[action.payload.todolistId1]
            return copyState
        default:
           return state
    }
}

export const removeTaskAC = (taskId: string, todolistId:string) => {
    return { type: 'REMOVE-TASK',
        taskId,
        todolistId
    }as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASKS',
        title,
        todolistId
    } as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id,
        isDone,
        todolistId

    } as const
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        newTitle,
        todolistId

    } as const
}