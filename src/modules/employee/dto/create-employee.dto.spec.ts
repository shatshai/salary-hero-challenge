import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { CreateEmployeeDto } from './create-employee.dto'
import { SalaryTypes } from '@app/config/constants'

describe('CreateEmployeeDto', () => {
  // Reset mocks and timers after each test
  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('Given correct data - should validate without error', async () => {
    const employee = {
      username: 'some-username',
      email: 'user@example.com',
      companyId: 2,
      salaryTypeId: SalaryTypes.MONTHLY,
      salary: 3000,
      payDate: 25,
    }
    const dto = plainToInstance(CreateEmployeeDto, employee)
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('Given pay date as null - should validate error', async () => {
    const employee = {
      username: 'some-username',
      email: 'user@example.com',
      companyId: 2,
      salaryTypeId: SalaryTypes.MONTHLY,
      salary: 3000,
      payDate: null,
    }
    const dto = plainToInstance(CreateEmployeeDto, employee)
    const errors = await validate(dto)
    expect(errors.length).toBe(1)
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          constraints: expect.objectContaining({
            isInt: 'payDate must be an integer number',
          }),
        }),
      ]),
    )
  })

  it('Given invalid salary type id - should validate error', async () => {
    const employee = {
      username: 'some-username',
      email: 'user@example.com',
      companyId: 2,
      salaryTypeId: 10,
      salary: 3000,
      payDate: 25,
    }
    const dto = plainToInstance(CreateEmployeeDto, employee)
    const errors = await validate(dto)
    expect(errors.length).toBe(1)
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          constraints: expect.objectContaining({
            isEnum: 'salaryTypeId must be one of the following values: 1, 2, 3',
          }),
        }),
      ]),
    )
  })
})
