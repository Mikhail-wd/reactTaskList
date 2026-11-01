import { useContext } from 'react'
import { AppState } from '../../pages/mainPage'
import classes from './filter.module.css'

export default function Filte() {
    const context = useContext(AppState)

    function filterChange(value: string) {
        context?.dispatch({ type: "filter", payload: value })
    }

    return (
        <div className={classes.filter__list}>
            <div className={classes.all} onClick={() => filterChange("all")}>Все</div>
            <div className={classes.done} onClick={() => filterChange("done")}>Выполненные</div>
            <div className={classes.in__process} onClick={() => filterChange("in_process")}>Активные</div>
        </div>
    )
}