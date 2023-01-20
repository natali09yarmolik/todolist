import {combineReducers, compose, createStore, legacy_createStore} from 'redux'
import {tasksReducer} from "./tasks-reduser";
import {todolistReduser} from "./todolist-reduser";

declare global {
    interface Window{
        __REDUX_DEVTOOLS_EXTENTION_COMPOSE__?:typeof compose;
    }
}
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReduser
})

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__|| compose
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, composeEnhancers())
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store