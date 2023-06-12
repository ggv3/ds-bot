export const sum = (val1: number, val2: number) => val1 + val2
export const reduce = (val1: number, val2: number) => {
  if (val1 < val2) {
    throw new Error('Error with reduce')
  }
  return val1 - val2
}
