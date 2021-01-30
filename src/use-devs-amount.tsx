import React, { FunctionComponent, useCallback, useState } from 'react'
import { DevTypeProps } from './types'

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

export const useDevsAmount = (
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
        <DevAmount label={label} value={value} onChange={handleChange} />
    )

    return [value, Component]
}
