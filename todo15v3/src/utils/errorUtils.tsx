import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError=(dispatch:Dispatch, e:{messages:string})=>{
    dispatch(setAppErrorAC(e.messages))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = (data: ResponseType, dispatch: ErrorUtilsDispatchType) => {
    if(data.messages.length)
    {
        dispatch(setAppErrorAC(data.messages[0]))
    }
    else{
        dispatch(setAppErrorAC('ERROR!!!'))
    }
}

export type ErrorUtilsDispatchType=Dispatch<SetAppStatusACType | SetAppErrorACType>