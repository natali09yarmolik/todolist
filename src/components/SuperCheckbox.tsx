import React, {ChangeEvent} from "react";

type PropsType={
    checked: boolean
    callback: (event:boolean)=>void
}
export const SuperCheckBox=(props:PropsType)=>{

    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
    props.callback(e.currentTarget.checked)
    }
    return (
        <input type={"checkbox"}
               checked={props.checked}
               onChange={onChangeHandler}/>
    )
}