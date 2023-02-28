import { Dispatch } from 'redux'
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../../app/app-reducer'
import {authAPI} from "../../api/todolists-api";
import {FormikErrorType} from "./Login";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-INITIALIZED":
            return {...state, isInitialized:action.initialized}
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const setIsInitializedAC = (initialized: boolean) =>
    ({type: 'SET-INITIALIZED', initialized} as const)

// thunks
export const loginTC = (data: FormikErrorType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        }else if(res.data.resultCode === 1){
            handleServerAppError(res.data, dispatch)
        }
    } catch (e:any) {
        handleServerNetworkError(e, dispatch)
    }
}

export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.me()
        console.log(res)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('succeeded'))
        }else {
            dispatch(setIsInitializedAC(true))
            handleServerAppError(res.data, dispatch)
        }
    } catch (e:any) {

        handleServerNetworkError(e, dispatch)
    }
}

export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.logout()
        console.log(res)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        }else if(res.data.resultCode === 1){
            handleServerAppError(res.data, dispatch)
        }
    } catch (e:any) {
        handleServerNetworkError(e, dispatch)
    }
}

// types
type SetIsInitializedACType=ReturnType<typeof setIsInitializedAC>
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType
                                                      | SetAppErrorActionType
                                                      | SetIsInitializedACType
