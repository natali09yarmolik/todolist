import {Provider} from "react-redux";
import {AppRootStateType, store} from "./store";
import React from "react";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reduser";
import {todolistReduser} from "./todolist-reduser";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReduser
})
const initialGlobalState={
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator=(storyFn:()=>React.ReactNode)=>(<Provider store={store}>{storyFn()}</Provider>)

