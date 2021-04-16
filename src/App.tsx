import React, { useEffect, useState } from 'react'
import { BE, FE, DAILY_CAPACITY } from './constants'
import { useRoleSelect } from './hooks/use-role-select'
import { useInput } from './hooks/use-input'

import { Section } from './components/Section'

import { calcSpAmount } from './helpers/calc-sp-amount'

import styles from './App.module.css'

export const App = () => {
    const [feSpAmount, setFeSpAmount] = useState(0)
    const [beSpAmount, setBeSpAmount] = useState(0)

    const [feDevsAmount, FeDevsAmountInput] = useInput(
        0,
        'Сколько будет фронтенд-разработчиков?'
    )
    const [beDevsAmount, BeDevsAmountInput] = useInput(
        0,
        'Сколько будет бэкенд-разработчиков?'
    )
    const [holidays, HolidaysInput] = useInput(0, 'Сколько будет праздников?')

    const [lastWeekDuty, LastWeekRoleSelect] = useRoleSelect(
        BE,
        'Дежурный на второй неделе минувшего спринта'
    )

    const [sprintFirstWeekDuty, SprintFirstWeekRoleSelect] = useRoleSelect(
        BE,
        'Дежурный на первой неделе нового спринта'
    )

    const [sprintSecondWeekDuty, SprintSecondWeekRoleSelect] = useRoleSelect(
        BE,
        'Дежурный на второй неделе нового спринта'
    )

    useEffect(() => {
        const feSpAmount = calcSpAmount(
            feDevsAmount,
            lastWeekDuty === FE,
            sprintFirstWeekDuty === FE,
            sprintSecondWeekDuty === FE,
            DAILY_CAPACITY,
            holidays
        )

        const beSpAmount = calcSpAmount(
            beDevsAmount,
            lastWeekDuty === BE,
            sprintFirstWeekDuty === BE,
            sprintSecondWeekDuty === BE,
            DAILY_CAPACITY,
            holidays
        )

        setFeSpAmount(feSpAmount)
        setBeSpAmount(beSpAmount)
    }, [
        beDevsAmount,
        feDevsAmount,
        holidays,
        lastWeekDuty,
        sprintFirstWeekDuty,
        sprintSecondWeekDuty,
    ])

    return (
        <div className={styles.wrapper}>
            <header>
                <h1>Щёччик</h1>
            </header>
            <main>
                <Section>{BeDevsAmountInput}</Section>
                <Section>{FeDevsAmountInput}</Section>
                <Section>{LastWeekRoleSelect}</Section>
                <Section>{SprintFirstWeekRoleSelect}</Section>
                <Section>{SprintSecondWeekRoleSelect}</Section>
                <Section>{HolidaysInput}</Section>

                <hr />

                <section>
                    <div>
                        <strong>{beSpAmount}SP</strong> на бэкенд
                    </div>
                    <div>
                        <strong>{feSpAmount}SP</strong> на фронтенд
                    </div>
                </section>
            </main>
        </div>
    )
}
