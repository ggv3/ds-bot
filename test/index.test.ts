import { sum, reduce } from '../src/index'

describe('index.js', () => {
  it('should sum correctly', () => {
    expect(sum(2, 2)).toEqual(4)
  })

  it('should reduce correctly', () => {
    expect(reduce(10, 5)).toEqual(5)
  })

  it('should return error', () => {
    expect(() => {
      reduce(5, 10)
    }).toThrowError('Error with reduce')
  })
})
