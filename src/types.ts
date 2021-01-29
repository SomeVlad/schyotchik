import React from 'react'

export type DevTypeProps = {
    label: string
    value: number
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export type RoleSelectProps = {
    value: string
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}
