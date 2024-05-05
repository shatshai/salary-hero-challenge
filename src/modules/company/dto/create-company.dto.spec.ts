import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { CreateCompanyDto } from './create-company.dto'

describe('CreateCompanyDto', () => {
  // Reset mocks and timers after each test
  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('Given correct data - should validate without error', async () => {
    const company = {
      name: 'some name',
      address: 'some address',
    }
    const dto = plainToInstance(CreateCompanyDto, company)
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('Given pay date as null - should validate error', async () => {
    const company = {
      name: 'some name',
    }
    const dto = plainToInstance(CreateCompanyDto, company)
    const errors = await validate(dto)
    expect(errors.length).toBe(1)
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          constraints: expect.objectContaining({
            isNotEmpty: 'address should not be empty',
          }),
        }),
      ]),
    )
  })
})
