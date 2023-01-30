import React from 'react'
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";


export default {
    title: 'EDITABLE/SPAN',
    component: EditableSpan,
    args:{
       onClick:{
           description:'Button click'
       } }
}as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args)=><EditableSpan {...args}/>

export const EditableSpanStory = Template.bind({})

EditableSpanStory.args={
    onChange:action('EditableSpan value change')
}
