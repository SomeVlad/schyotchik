import React, { useCallback, useState } from 'react'
import styles from './styles.module.css'

export const useInput = (
    defaultValue: number,
    label: string
): [number, JSX.Element] => {
    const [value, setValue] = useState(defaultValue)

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = Number(event.currentTarget.value)
            setValue(inputValue)
        },
        [setValue]
    )

    const Component = (
        <label>
            {label}
            <input
                className={styles.input}
                type='number'
                min={0}
                value={value}
                onChange={handleChange}
            />
        </label>
    )

    return [value, Component]
}
