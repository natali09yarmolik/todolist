import axios from 'axios'
import addItemFormStories from "../../../src/stories/AddItemForm.stories";


const instance=axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '58405d8a-0757-4cae-8a64-01c1b1e3c28e',
    },
})

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<D={}>={
    resultCode: number
    messages: string[],
    data: D
}


export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`,
            { title: title } )
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistId}`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item:TodolistType}>>(`todo-lists`,{title:title})

    },
    getTodolist() {
        return instance.get<Array<TodolistType>>(`todo-lists`)

    }
}