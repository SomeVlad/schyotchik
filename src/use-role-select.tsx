import React, { FunctionComponent, useCallback, useState } from 'react'
import { RoleSelectProps } from './types'
import { BE, FE } from './constants'

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

export const useRoleSelect = (
    defaultValue: string,
    label: string
): [string, JSX.Element] => {
    const [value, setValue] = useState(defaultValue)
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            const selectValue = event.currentTarget.value

            setValue(selectValue)
        },
        []
    )

    const Component = (
        <RoleSelect value={value} onChange={handleChange}>
            {label}
        </RoleSelect>
    )

    return [value, Component]
}
