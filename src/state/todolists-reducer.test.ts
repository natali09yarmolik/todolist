import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {
    TodolistAddAC,
    TodolistChangeFilterAC,
    TodolistChangeTitleAC,
    todolistReduser,
    TodolistRemoveAC
} from "./todolist-reduser";

let todolistId1:string
let todolistId2:string

let startState:Array<TodolistType>

beforeEach(()=>{
     todolistId1=v1()
     todolistId2=v1()

     startState=[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})
test('correct todolist should be removed',
    ()=>{
        const endState=todolistReduser(startState, TodolistRemoveAC(todolistId1))
        expect(endState.length).toBe(1)
        expect(endState[0].id).toBe(todolistId1)
    })

test('correct todolist should be added',
    ()=>{
        let newTodolistTitle='New Todolist'
        const endState=todolistReduser(startState, TodolistAddAC(newTodolistTitle))
        expect(endState.length).toBe(3)
        expect(endState[2].title).toBe(newTodolistTitle)
    })

test('correct todolist should change its name',
    ()=>{
        let newTodolistTitle='New Todolist'
        const endState=todolistReduser(startState, TodolistChangeTitleAC(todolistId2,newTodolistTitle ))
        expect(endState[0].title).toBe("What to learn")
        expect(endState[1].title).toBe(newTodolistTitle)
    })

test('correct filter of todolist should be change',
    ()=>{
       let newFilter:FilterValuesType='completed'
        const endState=todolistReduser(startState, TodolistChangeFilterAC(newFilter,todolistId2 ))
        expect(endState[0].filter).toBe("all")
        expect(endState[1].filter).toBe(newFilter)
    })