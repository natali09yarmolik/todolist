import React, {ChangeEvent, useState} from 'react'
import {Task} from "../Task";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {string} from "prop-types";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TODOLIST/TASK',
    component: Task,
    args:{
        removeTask:action('removeTask'),
        changeTaskStatus:action('changeTaskStatus'),
        changeTaskTitle:action('changeTaskTitle')
    }
}as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args)=><Task {...args}/>

export const TaskIsDoneStory = Template.bind({})

TaskIsDoneStory.args={
    task:{id:'string', isDone:true, title:'JS'},

   }

export const TaskNotIsDoneStory = Template.bind({})

TaskNotIsDoneStory.args={
    task:{id:'string', isDone:false, title:'CSS'},
}

const Template1: ComponentStory<typeof Task>=()=>{
    const [task, setTask]=useState({id:'string', isDone:true, title:'JS'})
   const changeTaskTitle=(title:string)=>setTask({...task, title: title})
   const changeTaskStatus=(id:string, newIsDoneValue:boolean) => {
       setTask({...task, isDone: newIsDoneValue});
   }
   const removeTask=()=>{action('Remove task')}
    return <Task task={task}
                 removeTask={action('Remove task')}
                 changeTaskStatus={changeTaskStatus}
                 changeTaskTitle={changeTaskTitle}/>
}
export const WorkTaskStory = Template1.bind({})