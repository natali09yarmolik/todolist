import { v1 } from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";




export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todo:TodolistType,
    filter: FilterValuesType
    /*title: string
    todolistId: string*/
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
type SetTodoType=ReturnType<typeof setTodo>
type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodoType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODO":{
            console.log('set todo')
            return action.todo.map(t=>({...t, filter: 'all'}))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {

            return[{
                id: action.todo.id,
                addedDate: action.todo.addedDate,
                order: action.todo.order,
                title: action.todo.title,
                filter: 'all'
            }, ...state]
           /* return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]*/
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todo: TodolistType, filter:FilterValuesType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todo, filter}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export const setTodo = (todo:TodolistType[])=> {
    return {type: 'SET-TODO',
            todo}as const
}
export const fetchTodolist=() => (dispatch:Dispatch)=>{
        todolistsAPI.getTodolists().then((res)=>{
            console.log(res.data)
            dispatch(setTodo(res.data))})
}
export const deleteTodolistTC=(todoID:string) => (dispatch:Dispatch)=>{
    todolistsAPI.deleteTodolist(todoID).then((res)=>{
        dispatch(removeTodolistAC(todoID))})
}

export const createTodolistTC=(title:string) => (dispatch:Dispatch)=>{
    todolistsAPI.createTodolist(title).then((res)=>{
        dispatch(addTodolistAC(res.data.data.item, 'all'))})
}
export const changeTodolistTitleTC=(todoID: string, title: string) => (dispatch:Dispatch)=>{
    todolistsAPI.updateTodolist(todoID, title).then((res)=>{
        dispatch(changeTodolistTitleAC(todoID, title))
    })
}
export const deleteTodolistThunk=(todoID: string) => (dispatch:Dispatch)=>{
    todolistsAPI.deleteTodolist(todoID).then((res)=>{
        dispatch(removeTodolistAC(todoID))
    })
}