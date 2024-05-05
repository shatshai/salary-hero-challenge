import { Logger, Injectable, NotFoundException } from '@nestjs/common'
import { Employee, Prisma } from '@prisma/client'
import { isEmpty } from 'lodash'
import { EmployeeRepository } from '@app/modules/employee/employee.repository'
import { computeSalaryRate } from '@app/common/utils/salary.utils'
import { EmployeeWithCompanyWithSalaryType, WithSalaryRate } from './types'
import { CreateEmployeeDto } from '@app/modules/employee/dto/create-employee.dto'
import { UpdateEmployeeDto } from '@app/modules/employee/dto/update-employee.dto'

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
      this.logger.error(`GetEmployee error: ${error.message}`)
      throw error
    }
  }

  /**
   * Creates a new employee with the provided data and computes their salary rate.
   * @param data - The data for creating the employee.
   * @returns A Promise resolving to an object containing the created employee's salary details.
   */
  async createEmployee(
    data: CreateEmployeeDto,
  ): Promise<WithSalaryRate<Employee> | WithSalaryRate<EmployeeWithCompanyWithSalaryType> | null> {
    try {
      // Call the employeeRepository to create the employee with the provided data.
      const employee = await this.employeeRepository.createEmployee(data)

      // Compute and return the salary rate for the created employee.
      return computeSalaryRate(employee)
    } catch (error) {
      // Log the error and rethrow it to the exception filter.
      this.logger.error(`CreateEmployee error: ${error.message}`)
      throw error
    }
  }

  /**
   * Updates an employee with the provided ID using the data from UpdateEmployeeDto and computes their salary rate.
   * @param id - The ID of the employee to update.
   * @param data - The data for updating the employee.
   * @returns A Promise resolving to an object containing the updated employee's salary details.
   */
  async updateEmployee(
    id: number,
    data: UpdateEmployeeDto,
  ): Promise<WithSalaryRate<Employee> | WithSalaryRate<EmployeeWithCompanyWithSalaryType>> {
    try {
      // Call the employeeRepository to update the employee with the provided ID and data.
      const employee = await this.employeeRepository.updateEmployee(id, data)

      // Compute and return the salary rate for the updated employee.
      return computeSalaryRate(employee)
    } catch (error) {
      // Log the error and rethrow it to the exception filter.
      this.logger.error(`UpdateEmployee error: ${error.message}`)
      throw error
    }
  }

  /**
   * Deletes an employee with the provided ID and computes their salary rate.
   * @param id - The ID of the employee to delete.
   * @returns A Promise resolving to an object containing the deleted employee's salary details.
   */
  async deleteEmployee(id: number): Promise<WithSalaryRate<Employee>> {
    try {
      // Call the employeeRepository to delete the employee with the provided ID.
      const employee = await this.employeeRepository.deleteEmployee(id)

      // Compute and return the salary rate for the updated employee.
      return computeSalaryRate(employee)
    } catch (error) {
      // Log the error and rethrow it to the exception filter.
      this.logger.error(`DeleteEmployee error: ${error.message}`)
      throw error
    }
  }
}
