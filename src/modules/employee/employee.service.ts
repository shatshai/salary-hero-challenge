import { Logger, Injectable, NotFoundException } from '@nestjs/common'
import { Employee, Prisma } from '@prisma/client'
import { isEmpty } from 'lodash'
import { EmployeeRepository } from '@app/modules/employee/employee.repository'
import { computeSalaryRate } from '@app/common/utils/salary.utils'
import { EmployeeWithCompanyWithSalaryType, WithSalaryRate } from './types'

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name)

  // Initialize employee repository service
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  /**
   * Retrieves employees based on the provided criteria and computes their salary rates.
   * @param employeeWhereInput The criteria for filtering employees.
   * @returns A promise resolving to an array of employees with computed salary rates, or null if no employees match the criteria.
   */
  async getEmployees(
    employeeWhereInput: Prisma.EmployeeWhereInput,
  ): Promise<WithSalaryRate<Employee>[] | WithSalaryRate<EmployeeWithCompanyWithSalaryType>[] | NotFoundException> {
    try {
      // Retrieve employees from the repository based on the input criteria
      const employees = await this.employeeRepository.getEmployees(employeeWhereInput)

      if (isEmpty(employees)) {
        throw new NotFoundException('Employees not found')
      }

      // Compute salary rates for each retrieved employee
      return employees.map((employee) => computeSalaryRate(employee))
    } catch (error) {
      // Logging error and throw to exception filter
      this.logger.error(`GetEmployees error: ${error.message}`)
      throw error
    }
  }

  /**
   * Retrieves an employee with the provided ID along with their salary details.
   * @param id - The ID of the employee to retrieve.
   * @returns A Promise resolving to an object containing the employee's salary details.
   */
  async getEmployee(id: number): Promise<WithSalaryRate<Employee> | WithSalaryRate<EmployeeWithCompanyWithSalaryType>> {
    try {
      // Retrieve the employee details from the repository based on the provided ID.
      const employee = await this.employeeRepository.getEmployee({ id })

      // If employee is empty, throw a NotFoundException.
      if (isEmpty(employee)) {
        throw new NotFoundException('Employee not found')
      }

      // Compute and return the salary rate for the employee.
      return computeSalaryRate(employee)
    } catch (error) {
      // Log the error and rethrow it to the exception filter.
      this.logger.error(`GetEmployees error: ${error.message}`)
      throw error
    }
  }
}
