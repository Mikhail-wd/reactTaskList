import { useContext } from 'react'
import { AppState } from '../../../pages/mainPage'
import type { Task } from '../../../pages/mainPage'
import Button from '../../button'
import classes from './task.module.css'

export default function Task(props: Task) {
    const context = useContext(AppState)

    function removeTask() {
        context?.dispatch({ type: "remove_task", payload: props.index })
    }

    function changeStatus() {
        context?.dispatch({ type: "change_task_state", payload: props.index })
    }

    return (
        <div className={`defaultBlock ${classes.task}`}>
            <div className={classes.task__content}>
                <h4>{props.taskName}</h4>
                <p className={props.status ? classes.done : classes.in__progress}>{props.status ? "Выполнена" : "Активна"}</p>
            </div>
            <div className={classes.task__content}>
                <Button callback={() => removeTask()}>Удалить задачу</Button>
                <p className={classes.status} onClick={() => changeStatus()}>Изменить статус задачи</p>
            </div>
        </div>
    )
}