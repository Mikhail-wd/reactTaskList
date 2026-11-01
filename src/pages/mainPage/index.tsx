import { createContext, useEffect, useReducer, type ActionDispatch } from 'react'
import { useLocalStorageInit, useLocalStorageTaskProcess, useLocalStorageLoadTasksList } from '../../hooks/useLocalStorage'
import TasksList from '../../components/tasksList'
import Form from '../../components/form'
import classes from './mainPage.module.css'

export type Task = {
    taskName: string,
    status: boolean,
    index: string
}

type AppState = {
    data: Storage,
    dispatch: ActionDispatch<any>
}

type Storage = {
    filter: string,
    tasksList: [] | Array<Task>,
    tasksListFiltered: [] | Array<Task>
}

type Action = {
    type: string,
    payload: Task | null | string | boolean
}

function reducer(state: Storage, action: Action) {
    switch (action.type) {
        case "localStore_check":
            return { ...state, tasksList: action.payload }
        case "add_task":
            if (action.payload !== null) {
                let tempArray = state.tasksList
                tempArray.push(action.payload)
                useLocalStorageTaskProcess(tempArray)
                return { ...state, tasksList: tempArray }
            } else {
                return { ...state }
            }
        case "remove_task":
            if (action.payload !== null && state.tasksList.length != 0) {
                let tempArray = state.tasksList.filter(elem => elem.index !== action.payload)
                useLocalStorageTaskProcess(tempArray)
                return { ...state, tasksList: tempArray, tasksListFiltered: tempArray }
            } else {
                return { ...state }
            }
        case "change_task_state":
            let tempArray = state.tasksList
            tempArray.map((elem, index) => {
                if (elem.index == action.payload) {
                    tempArray[index].status = !tempArray[index].status
                }
            })
            useLocalStorageTaskProcess(tempArray)
            return { ...state, tasksList: tempArray }
        case "filter":
            switch (action.payload) {
                case "done":
                    let tempArrayDone = state.tasksList.filter(elem => elem.status !== false)
                    console.log(tempArrayDone)
                    return { ...state, tasksListFiltered: tempArrayDone }
                case "in_process":
                    let tempArrayInProcess = state.tasksList.filter(elem => elem.status !== true)
                    console.log(tempArrayInProcess)
                    return { ...state, tasksListFiltered: tempArrayInProcess }
                default:
                    return { ...state, tasksListFiltered: state.tasksList }
            }
        default:
            console.warn("Error in App reducer")
            return { ...state }
    }

}

const initData = {
    filter: "all",
    tasksList: [],
    tasksListFiltered: []
}

export const AppState = createContext<AppState | undefined>(undefined)

export default function MainPage() {
    const localStorageInit = useLocalStorageInit()
    const localStorage = useLocalStorageLoadTasksList()
    const [AppData, dispatch] = useReducer(reducer, initData)

    useEffect(() => {
        localStorageInit
        dispatch({ type: "localStore_check", payload: localStorage })
    }, [])

    return (
        <AppState.Provider value={{ data: AppData, dispatch: dispatch }} >
            <div className={classes.mainPage}>
                <Form />
                <TasksList />
            </div>
        </AppState.Provider >
    )
}