import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { UpdateCompanyDto } from './update-company.dto'

describe('UpdateCompanyDto', () => {
  // Reset mocks and timers after each test
  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('Given correct update data - should validate without error', async () => {
    const company = {
      id: 1,
      name: 'some name',
      address: 'some address',
    }
    const dto = plainToInstance(UpdateCompanyDto, company)
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('Given missing id - should validate error', async () => {
    const Company = {
      id: 1,
      name: 'some name',
    }
    const dto = plainToInstance(UpdateCompanyDto, Company)
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
