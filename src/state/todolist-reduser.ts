import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

const initialState:TodolistType[]=[]

export const todolistReduser=(state:TodolistType[]=initialState, action:TodolistReduserActionType):TodolistType[]=>
{
    switch (action.type){

        case "REMOVE-TODOLIST":{
               return state.filter(el=>el.id!==action.payload.todolistId1)
            }
        case "ADD-TODOLIST":{
            let newTodolistId = action.payload.todolistId;
            let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.title, filter: 'all'};

            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE":{

        return state.map(el=>el.id===action.payload.id? {...el, title: action.payload.title}
             : el)
        }
        case "CHANGE-TODOLIST-FILTER":{

            return state.map(el=>el.id===action.payload.todolistId? {...el, filter:action.payload.value}:el)
        }
        default: return state
    }
}
export type TodolistReduserActionType=TodolistRemoveACType |
                               TodolistAddACType |
                               TodolistChangeTitleACType |
                               TodolistChangeFilterACType

export type TodolistRemoveACType=ReturnType<typeof TodolistRemoveAC>
export const TodolistRemoveAC=(todolistId1:string)=>{
    return{
        type:'REMOVE-TODOLIST',
        payload:{
            todolistId1
        }
    }as const
}
export type TodolistAddACType=ReturnType<typeof TodolistAddAC>
export const TodolistAddAC=(title:string)=>{
    return{
        type:'ADD-TODOLIST',
        payload:{
            title,
            todolistId: v1()
        }
    }as const
}
type TodolistChangeTitleACType=ReturnType<typeof TodolistChangeTitleAC>
export const TodolistChangeTitleAC=(id: string, title: string)=>{
    return{
        type:'CHANGE-TODOLIST-TITLE',
        payload:{
            id,
            title
        }
    }as const
}

type TodolistChangeFilterACType=ReturnType<typeof TodolistChangeFilterAC>
export const TodolistChangeFilterAC=(value: FilterValuesType, todolistId: string)=>{
    return{
        type:'CHANGE-TODOLIST-FILTER',
        payload:{
            todolistId,
            value
        }
    }as const
}