import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { UpdateEmployeeDto } from './update-employee.dto'
import { SalaryTypes } from '@app/config/constants'

describe('UpdateEmployeeDto', () => {
  // Reset mocks and timers after each test
  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('Given correct update data - should validate without error', async () => {
    const employee = {
      id: 1,
      username: 'some-username',
      email: 'user@example.com',
      companyId: 2,
      salaryTypeId: SalaryTypes.MONTHLY,
      salary: 3000,
      payDate: 25,
    }
    const dto = plainToInstance(UpdateEmployeeDto, employee)
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('Given missing id - should validate error', async () => {
    const employee = {
      username: 'some-username',
      email: 'user@example.com',
      companyId: 2,
      salaryTypeId: SalaryTypes.MONTHLY,
      salary: 3000,
      payDate: 25,
    }
    const dto = plainToInstance(UpdateEmployeeDto, employee)
    const errors = await validate(dto)
    expect(errors.length).toBe(1)
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          constraints: expect.objectContaining({
            isInt: 'id must be an integer number',
          }),
        }),
      ]),
    )
  })
})
