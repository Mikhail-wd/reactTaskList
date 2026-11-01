import type { Task } from "../../pages/mainPage"
import { useContext, useEffect, useState } from "react"
import { AppState } from "../../pages/mainPage"
import TaskComp from "./task"
import Filte from "../filter"

export default function TasksList() {
    const [list, setList] = useState<[] | Task[] | undefined>()
    const context = useContext(AppState)

    useEffect(() => {
        if (context?.data.tasksListFiltered.length !== 0) {
            setList(context?.data.tasksListFiltered)
        } else {
            setList(context?.data.tasksList)
        }
    }, [context?.data.tasksList, context?.data.tasksListFiltered])

    return (
        <>
            <h3>Список задач :</h3>
            <Filte />
            {list?.map(element => {
                return (
                    <TaskComp key={element.index}
                        taskName={element.taskName}
                        status={element.status}
                        index={element.index}
                    />)
            })}
        </>
    )
}