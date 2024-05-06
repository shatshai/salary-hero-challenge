import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { SearchEmployeeDto } from './search-employee.dto'
import { SalaryTypes } from '@app/config/constants'

describe('SearchEmployeeDto', () => {
  // Reset mocks and timers after each test
  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  it('Given correct data - should validate without error', async () => {
    const employee = {
      id: 1,
      username: 'some-username',
      email: 'user@example.com',
      companyId: 2,
      salaryTypeId: SalaryTypes.MONTHLY,
      salary: 3000,
      payDate: 25,
    }
    const dto = plainToInstance(SearchEmployeeDto, employee)
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
    expect(dto).toEqual(
      expect.objectContaining({
        id: 1,
        username: 'some-username',
        email: 'user@example.com',
        companyId: 2,
        salaryTypeId: SalaryTypes.MONTHLY,
        salary: 3000,
        payDate: 25,
      }),
    )
  })

  it('Given number as string - should validate without error', async () => {
    const employee = {
      id: '1',
      username: 'some-username',
      email: 'user@example.com',
      companyId: '2',
      salaryTypeId: SalaryTypes.MONTHLY,
      salary: '3000',
      payDate: '25',
    }
    const dto = plainToInstance(SearchEmployeeDto, employee)
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
    expect(dto).toEqual(
      expect.objectContaining({
        id: 1,
        username: 'some-username',
        email: 'user@example.com',
        companyId: 2,
        salaryTypeId: SalaryTypes.MONTHLY,
        salary: 3000,
        payDate: 25,
      }),
    )
  })

  it('Given pay date as null - should validate without error', async () => {
    const employee = {
      username: 'some-username',
      email: 'user@example.com',
      companyId: 2,
      salaryTypeId: SalaryTypes.MONTHLY,
      salary: 3000,
      payDate: null,
    }
    const dto = plainToInstance(SearchEmployeeDto, employee)
    const errors = await validate(dto)
    expect(errors.length).toBe(0)
    expect(dto).toEqual(
      expect.objectContaining({
        username: 'some-username',
        email: 'user@example.com',
        companyId: 2,
        salaryTypeId: SalaryTypes.MONTHLY,
        salary: 3000,
      }),
    )
    expect(dto).toEqual(
      expect.not.objectContaining({
        id: expect.anything(),
      }),
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
    const dto = plainToInstance(SearchEmployeeDto, employee)
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
