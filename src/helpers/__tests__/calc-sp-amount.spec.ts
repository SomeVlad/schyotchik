import { calcSpAmount } from '../calc-sp-amount'

test('calcSpAmount', () => {
    expect(calcSpAmount(5, true, true, true, 1.5, 3)).toEqual(34)
    expect(calcSpAmount(1, false, false, false, 1.8, 1)).toEqual(16)
    expect(calcSpAmount(0, true, false, true, 99, -1)).toEqual(0)
})
