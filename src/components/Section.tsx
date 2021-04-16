import React, { FunctionComponent } from 'react'
import styles from './Section.module.css'

export const Section: FunctionComponent = ({ children }) => (
    <section className={styles.section}>{children}</section>
)
