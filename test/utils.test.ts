import { isAllowedToUseCommand, executeCommand } from '../src/utils'

describe('isAllowedToUseCommand', () => {
  it('should return false if the user does not exist', async () => {
    const mockInteraction = {
      user: {
        id: '123456789',
      },
      guild: {
        members: {
          fetch: jest.fn(() => Promise.resolve(undefined)),
        },
      },
    }
    const result = await isAllowedToUseCommand([], mockInteraction as any)
    expect(result).toBe(false)
  })

  it('should return true if the user has an allowed role', async () => {
    const mockInteraction = {
      user: {
        id: '123456789',
      },
      guild: {
        members: {
          fetch: jest.fn(() =>
            Promise.resolve({
              roles: {
                cache: {
                  some: jest.fn(() => true),
                },
              },
            }),
          ),
        },
      },
    }
    const result = await isAllowedToUseCommand(['123456789'], mockInteraction as any)
    expect(result).toBe(true)
  })

  it('should return false if the user does not have an allowed role', async () => {
    const mockInteraction = {
      user: {
        id: '123456789',
      },
      guild: {
        members: {
          fetch: jest.fn(() =>
            Promise.resolve({
              roles: {
                cache: {
                  some: jest.fn(() => false),
                },
              },
            }),
          ),
        },
      },
    }
    const result = await isAllowedToUseCommand(['123'], mockInteraction as any)
    expect(result).toBe(false)
  })
})
