import { computeSalaryRate } from './salary.utils'
import { SalaryTypes, SalaryTypesDescription } from '@app/config/constants'
import { EmployeeWithCompanyWithSalaryType } from '@app/modules/employee/types'

describe('salary.utils', () => {
  describe('computeSalaryRate', () => {
    // Reset mocks and timers after each test
    afterEach(() => {
      jest.useRealTimers()
      jest.clearAllMocks()
    })

    const cases = [
      // Daily salary type cases
      [
        { id: 1, salaryTypeId: SalaryTypes.DAILY, salary: 700 },
        '2020-01-10',
        7000, // Reset mocks and timers after each test
      ],
      [
        { id: 1, salaryTypeId: SalaryTypes.DAILY, salary: 700 },
        '2020-01-30',
        21000, // 30 days * 700 (daily rate)
      ],
      // Monthly salary type cases
      [
        { id: 2, salaryTypeId: SalaryTypes.MONTHLY, salary: 30000 },
        '2020-01-10',
        9677.42, // Month with 31 days
      ],
      [
        { id: 2, salaryTypeId: SalaryTypes.MONTHLY, salary: 30000 },
        '2020-01-30',
        29032.26, // Month with 31 days
      ],
      [
        { id: 2, salaryTypeId: SalaryTypes.MONTHLY, salary: 30000 },
        '2020-04-10',
        10000, // Month with 30 days
      ],
      [
        { id: 2, salaryTypeId: SalaryTypes.MONTHLY, salary: 30000 },
        '2020-04-30',
        30000, // Month with 30 days
      ],
      // Monthly with specify salary payment date salary type cases
      [
        {
          id: 3,
          salaryTypeId: SalaryTypes.MONTH_TO_DATE,
          salary: 30000,
          payDate: 25,
        },
        '2020-05-10',
        16000, // Month with 30 days (Last Payment date in 25 April)
      ],
      [
        {
          id: 3,
          salaryTypeId: SalaryTypes.MONTH_TO_DATE,
          salary: 30000,
          payDate: 25,
        },
        '2020-04-30',
        6000, // Month with 30 days (Last Payment date in 25 April)
      ],
      [
        {
          id: 3,
          salaryTypeId: SalaryTypes.MONTH_TO_DATE,
          salary: 30000,
          payDate: 25,
        },
        '2020-06-10',
        16451.61, // 17 days * 967.7419, Month with 31 days (Last Payment date in 25 May)
      ],
      [
        {
          id: 3,
          salaryTypeId: SalaryTypes.MONTH_TO_DATE,
          salary: 30000,
          payDate: 25,
        },
        '2020-05-30',
        5806.45, // 6 days * 967.7419, Month with 31 days (Last Payment date in 25 May)
      ],
    ]
    test.each(cases)(
      'Given employee %p and today date is %p as arguments. Should return salary rate as %p',
      (employee: EmployeeWithCompanyWithSalaryType, todayDate: string, expected: number) => {
        // Mock the current date for testing
        jest.useFakeTimers().setSystemTime(new Date(todayDate as string))

        // Calculate salary rate for the employee
        const { salaryRate, salaryType } = computeSalaryRate(employee)

        // Check if the calculated salary rate matches the expected value
        expect(salaryRate).toEqual(expected)
        // Validate salaryType description
        expect(salaryType.description).toEqual(SalaryTypesDescription[employee.salaryTypeId])
      },
    )

    it('Given payment date is null should throw exception', () => {
      const employee = { id: 3, salaryTypeId: SalaryTypes.MONTH_TO_DATE, salary: 30000, payDate: null }
      try {
        computeSalaryRate(employee as unknown as EmployeeWithCompanyWithSalaryType)
      } catch (error) {
        expect(error.message).toEqual('Employee payment date is not set')
      }
    })

    it('Given payment date is 0 should throw exception', () => {
      const employee = { id: 3, salaryTypeId: SalaryTypes.MONTH_TO_DATE, salary: 30000, payDate: 0 }
      try {
        computeSalaryRate(employee as unknown as EmployeeWithCompanyWithSalaryType)
      } catch (error) {
        expect(error.message).toEqual('Employee payment date is not set')
      }
    })
  })
})
