import type { ReactNode } from "react"
import classes from "./button.module.css"

type Button = {
    children: ReactNode,
    callback: () => void
}

export default function Button(props: Button) {
    return (
        <button className={classes.button} onClick={props.callback}>
            {props.children}
        </button>
    )
}