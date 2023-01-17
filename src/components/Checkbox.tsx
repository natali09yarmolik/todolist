import React, {ChangeEvent} from "react";

type PropsType={
    checked: boolean
    callback: ()=>void
}
export const CheckBox=(props:PropsType)=>{


    return (
        <input type={"checkbox"}
               checked={props.checked}
               onChange={props.callback}/>
    )
}