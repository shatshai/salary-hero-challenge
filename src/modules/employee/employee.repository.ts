import { Logger, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '@app/infrastructure/prisma/prisma.service'
import { EmployeeWithCompany } from './types'

@Injectable()
export class EmployeeRepository {
  private readonly logger = new Logger(EmployeeRepository.name)

  // Initialize prisma service
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves employees based on the provided criteria.
   * @param employeeWhereInput The criteria for filtering employees.
   * @returns A promise resolving to an array of employees with associated company details, or null if no employees match the criteria.
   */
  async getEmployees(employeeWhereInput: Prisma.EmployeeWhereInput): Promise<EmployeeWithCompany[] | null> {
    return this.prisma.employee.findMany<{
      where: Prisma.EmployeeWhereInput
      include: {
        company: true
        salaryType: true
      }
    }>({
      include: {
        company: true,
        salaryType: true,
      },
      where: employeeWhereInput,
    })
  }

  /**
   * Retrieves an employee with company details based on the provided unique input.
   * @param employeeWhereUniqueInput - The unique input identifying the employee.
   * @returns A Promise resolving to an EmployeeWithCompany object or null if not found.
   */
  getEmployee(employeeWhereUniqueInput: Prisma.EmployeeWhereUniqueInput): Promise<EmployeeWithCompany | null> {
    // Retrieve the employee with company details from the database.
    return this.prisma.employee.findUnique<{
      where: Prisma.EmployeeWhereUniqueInput
      include: {
        company: true
        salaryType: true
      }
    }>({
      include: {
        company: true,
        salaryType: true,
      },
      where: employeeWhereUniqueInput,
    })
  }
}
