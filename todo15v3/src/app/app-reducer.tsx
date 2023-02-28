import React from 'react'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-ERROR":
            return{...state, error:action.error}
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}
export type SetAppStatusACType=ReturnType<typeof setAppStatusAC>
export type SetAppErrorACType=ReturnType<typeof setAppErrorAC>
export const setAppStatusAC=(status:RequestStatusType)=>{
    return{
        type:'APP/SET-STATUS',
        status
    }as const
}

export const setAppErrorAC=(error:null|string)=>{
    return{
       type: "APP/SET-ERROR",
        error
    }as const
}
export type ActionsType = SetAppStatusACType | SetAppErrorACType
