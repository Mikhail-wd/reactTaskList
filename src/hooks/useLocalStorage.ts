import type { Task } from "../pages/mainPage"

export function useLocalStorageInit() {
    let localStorage = window.localStorage.getItem("todoList")
    if (localStorage == null) {
        window.localStorage.setItem("todoList", "[]")
    }
}

export function useLocalStorageTaskProcess(value: [] | Array<Task>) {
    let localStorage = window.localStorage.getItem("todoList")
    if (localStorage !== null) {
        window.localStorage.setItem("todoList", JSON.stringify(value))
    }
}

export function useLocalStorageLoadTasksList() {
    let localStorage = window.localStorage.getItem("todoList")
    let tempArray = []
    if (localStorage !== null) {
        tempArray = JSON.parse(localStorage)
    }
    return tempArray
}