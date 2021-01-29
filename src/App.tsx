import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from 'react'
import { DevTypeProps, RoleSelectProps } from './types'
import {
    BE,
    FE,
    BE_CAPACITY_DAILY,
    FE_CAPACITY_DAILY,
    WORK_DAYS_IN_SPRINT,
} from './constants'
// import styles from './App.module.css'

const DevAmount: FunctionComponent<DevTypeProps> = ({
    label,
    value,
    onChange,
}) => (
    <section>
        <label>
            Сколько будет {label}-разработчиков?
            <input type='number' min={0} value={value} onChange={onChange} />
        </label>
    </section>
)

const RoleSelect: FunctionComponent<RoleSelectProps> = ({
    children,
    value,
    onChange,
}) => (
    <section>
        <label>
            {children}
            <select value={value} onChange={onChange}>
                <option value={BE}>Бэкендер</option>
                <option value={FE}>Фронтендер</option>
            </select>
        </label>
    </section>
)

export const App = () => {
    const [feAmount, setFeAmount] = useState(0)
    const [beAmount, setBeAmount] = useState(0)

    const [feSpAmount, setFeSpAmount] = useState(0)
    const [beSpAmount, setBeSpAmount] = useState(0)

    const [lastWeekDuty, setLastWeekDuty] = useState(BE)

    const [sprintFirstWeekDuty, setSprintFirstWeekDuty] = useState(BE)
    const [sprintSecondWeekDuty, setSprintSecondWeekDuty] = useState(BE)

    const handleFeAmountChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = Number(event.currentTarget.value)
            setFeAmount(inputValue)
        },
        [setFeAmount]
    )

    useEffect(() => {
        let workDaysAmount = WORK_DAYS_IN_SPRINT * feAmount

        if (lastWeekDuty === FE) {
            // duty day off
            workDaysAmount--
        }

        if (sprintFirstWeekDuty === FE) {
            // duty
            workDaysAmount -= 5
            // duty day off
            workDaysAmount--
        }

        if (sprintSecondWeekDuty === FE) {
            workDaysAmount -= 5
        }
        // const workDaysAmount = WORK_DAYS_IN_SPRINT - daysOff
        setFeSpAmount(Math.max(FE_CAPACITY_DAILY * workDaysAmount, 0))
    }, [feAmount, lastWeekDuty, sprintFirstWeekDuty, sprintSecondWeekDuty])

    const handleBeAmountChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = Number(event.currentTarget.value)
            setBeAmount(inputValue)
        },
        [setBeAmount]
    )

    useEffect(() => {
        let workDaysAmount = WORK_DAYS_IN_SPRINT * beAmount

        if (lastWeekDuty === BE) {
            // duty day off
            workDaysAmount--
        }

        if (sprintFirstWeekDuty === BE) {
            // duty
            workDaysAmount -= 5
            // duty day off
            workDaysAmount--
        }

        if (sprintSecondWeekDuty === BE) {
            workDaysAmount -= 5
        }

        setBeSpAmount(Math.max(BE_CAPACITY_DAILY * workDaysAmount, 0))
    }, [beAmount, lastWeekDuty, sprintFirstWeekDuty, sprintSecondWeekDuty])

    const handleLastWeekDutyChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            const selectValue = event.currentTarget.value

            setLastWeekDuty(selectValue)
        },
        []
    )

    const handleSprintFirstWeekDutyChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedValue = event.currentTarget.value

            setSprintFirstWeekDuty(selectedValue)
        },
        []
    )

    const handleSprintSecondWeekDutyChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedValue = event.currentTarget.value

            setSprintSecondWeekDuty(selectedValue)
        },
        []
    )

    return (
        <>
            <header>
                <h1>Щёччик</h1>
            </header>
            <main>
                <DevAmount
                    label='бэкенд'
                    value={beAmount}
                    onChange={handleBeAmountChange}
                />

                <DevAmount
                    label='фронтенд'
                    value={feAmount}
                    onChange={handleFeAmountChange}
                />

                <RoleSelect
                    value={lastWeekDuty}
                    onChange={handleLastWeekDutyChange}
                >
                    Дежурный на второй неделе минувшего спринта
                </RoleSelect>

                <RoleSelect
                    value={sprintFirstWeekDuty}
                    onChange={handleSprintFirstWeekDutyChange}
                >
                    Дежурный на первой неделе нового спринта
                </RoleSelect>

                <RoleSelect
                    value={sprintSecondWeekDuty}
                    onChange={handleSprintSecondWeekDutyChange}
                >
                    Дежурный на второй неделе нового спринта
                </RoleSelect>

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
        </>
    )
}
