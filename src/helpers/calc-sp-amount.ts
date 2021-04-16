import { WORK_DAYS_IN_SPRINT } from '../constants'

export const calcSpAmount = (
    workersAmount: number,
    isLastWeekDutyRole: boolean,
    isFirstWeekDutyRole: boolean,
    isSecondWeekDutyRole: boolean,
    dailyCapacity: number,
    holidays: number
): number => {
    let workDaysAmount = (WORK_DAYS_IN_SPRINT - holidays) * workersAmount

    if (isLastWeekDutyRole) {
        // duty day off
        workDaysAmount--
    }

    if (isFirstWeekDutyRole) {
        // duty
        workDaysAmount -= 5
        // duty day off
        workDaysAmount--
    }

    if (isSecondWeekDutyRole) {
        workDaysAmount -= 5
    }

    return Math.max(Math.floor(dailyCapacity * workDaysAmount), 0)
}
