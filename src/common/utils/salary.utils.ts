import * as dayjs from 'dayjs'
import { BadRequestException } from '@nestjs/common'
import { SalaryTypes, INCLUDE_PAYMENT_DATE } from '@app/config/constants'
import { Employee } from '@prisma/client'
import { EmployeeWithCompanyWithSalaryType, WithSalaryRate } from '@app/modules/employee/types'

/**
 * Computes the salary rate for an employee based on their salary type (monthly or daily).
 * @param employee The employee data, including salary type and payment details.
 * @returns An object containing the employee data with the calculated salary rate.
 */
export function computeSalaryRate(
  employee: Employee | EmployeeWithCompanyWithSalaryType,
): WithSalaryRate<Employee> | WithSalaryRate<EmployeeWithCompanyWithSalaryType> {
  // Get the current date
  const currentDate = dayjs()
  if (employee.salaryTypeId === SalaryTypes.MONTH_TO_DATE && !employee.payDate) {
    throw new BadRequestException('Employee payment date is not set')
  }

  // Check if the current date is before the pay date
  const isDataBeforePayDate = currentDate.date() < employee.payDate

  // Determine the start date based on salary type (monthly or monthly-to-date)
  const startDateFormat =
    employee.salaryTypeId === SalaryTypes.MONTH_TO_DATE ? `YYYY-MM-${employee.payDate}` : 'YYYY-MM-01'
  const lastPaymentDate = isDataBeforePayDate
    ? currentDate.subtract(1, 'month') // Use the last month's data if before pay date
    : currentDate
  const startDate = dayjs(lastPaymentDate.format(startDateFormat))

  // Include payment date in the calculation (1 for true, 0 for false)
  const withPaymentDate = INCLUDE_PAYMENT_DATE ? 1 : 0

  // Calculate the difference in days between the start date and current date
  const dateDiff = currentDate.diff(startDate, 'day') + withPaymentDate

  // Calculate the salary rate based on salary type (daily or monthly)
  const salaryRate =
    employee.salaryTypeId === SalaryTypes.DAILY
      ? employee.salary * dateDiff // Daily salary rate
      : (employee.salary / startDate.daysInMonth()) * dateDiff // Monthly salary rate

  // Return the employee data with the calculated salary rate
  return {
    ...employee,
    salaryRate: parseFloat(salaryRate.toFixed(2)), // Round salary rate to 2 decimal places
  }
}
