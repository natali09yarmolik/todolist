import axios from 'axios'

const instance=axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '58405d8a-0757-4cae-8a64-01c1b1e3c28e',
    },
})
type TaskType={
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}
type UpdateModelType={
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}
type GetTasksType= {
    items: TaskType[]
    Items: TaskType
    totalCount: number
    error: string
}

/*type PostAndPutAndDeleteTaskType={
    resultCode: number
    messages: string[],
    data: {}
}*/
type ResponceType<D={}>={
    resultCode: number
    messages: string[],
    data: D
}
/*type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<D={}>={
    resultCode: number
    messages: string[],
    data: D
}*/


export const taskAPI = {
    updateTask(todolistId: string,taskId:string, model:UpdateModelType) {
        return instance.put<ResponceType>(`todo-lists/${todolistId}/tasks/${taskId}`,
            model )
    },
    deleteTask(todolistId: string, taskId:string) {
        return instance.delete<ResponceType>(
            `todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<ResponceType>(`todo-lists/${todolistId}/tasks`,{title:title})

    },
    getTask(todolistId: string) {
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)

    }
}