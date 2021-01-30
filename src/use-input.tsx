import React, { useCallback, useState } from 'react'

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
        <section>
            <label>
                {label}
                <input
                    type='number'
                    min={0}
                    value={value}
                    onChange={handleChange}
                />
            </label>
        </section>
    )

    return [value, Component]
}
