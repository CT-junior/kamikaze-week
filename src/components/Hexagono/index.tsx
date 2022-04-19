import { ReactNode } from "react"
import styles from "./styles.module.scss"

interface HexagonoProps {
    children: ReactNode;
}

export function Hexagono({children} : HexagonoProps){
    return(
        <div className={styles.hexagono}>
            {children}
        </div>
    )
}