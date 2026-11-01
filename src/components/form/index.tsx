import { AppState } from "../../pages/mainPage"
import { useContext, useState } from "react"
import classes from './form.module.css'
import Button from '../button'

export default function Form() {
    const [taskName, setTaskName] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const context = useContext(AppState)


    function wrightTask(value: string) {
        setTaskName(value)
    }

    function addTask() {
        let tempTast = taskName.trim()
        if (tempTast.length > 0) {
            setError(false)
            setTaskName("")
            context?.dispatch({
                type: "add_task", payload: {
                    taskName: tempTast,
                    status: false,
                    index: new Date().getTime()
                }
            })
        } else {
            setError(true)
        }
    }

    return (
        <form onSubmit={(event) => event.preventDefault()} className={`defaultBlock ${classes.form}`}>
            <h1>Форма добавления задачи :</h1>
            <div className={classes.form__content}>
                {error ? <p className={classes.error__text}>Убедитесь что задача не пустая</p> : null}
                <input className={error ? classes.input__error : classes.input} type="text"
                    placeholder="Название задачи"
                    value={taskName}
                    onChange={(event) => wrightTask(event.target.value)} />
                <Button callback={() => addTask()}>Создать задачу</Button>
            </div>
        </form>
    )
}