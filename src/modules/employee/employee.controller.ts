import { Controller, Get, Logger, Param, Query, NotFoundException } from '@nestjs/common'
import { ApiParam, ApiQuery } from '@nestjs/swagger'
import { EmployeeService } from '@app/modules/employee/employee.service'
import { EmployeeWithSalaryRateEntity } from '@app/modules/employee/entities/employee-with-salary-rate.entity'
import { ParseIntPipe } from '@app/common/pipes/parse-int.pipe'

@Controller('/employee')
export class EmployeeController {
  private readonly logger = new Logger(EmployeeController.name)

  // Initialize employee service
  constructor(private readonly employeeService: EmployeeService) {}

  /**
   * Endpoint to retrieve an employees with filter by company id or employee email
   * @param email - The email of the employee to retrieve.
   * @param companyId - The companyId of the employee to retrieve.
   * @returns A Promise resolving to an array of object representing the employees with salary details.
   */
  @Get()
  @ApiQuery({
    name: 'email',
    description: 'Employee Email',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'companyId',
    description: 'Company ID',
    required: false,
    type: Number,
  })
  async getEmployees(
    @Query('email') email: string,
    @Query('companyId') companyId: number,
  ): Promise<EmployeeWithSalaryRateEntity[] | NotFoundException> {
    // Call the employeeService to retrieve the employees with filter by company id or employee email
    return this.employeeService.getEmployees({
      email,
      companyId,
    })
  }

  /**
   * Endpoint to retrieve an employee by ID.
   * @param id - The ID of the employee to retrieve.
   * @returns A Promise resolving to an object representing the employee with salary details.
   */
  @Get('/:id')
  @ApiParam({
    name: 'id',
    description: 'Employee ID',
    type: Number,
  })
  async getEmployee(@Param('id', new ParseIntPipe()) id: number): Promise<EmployeeWithSalaryRateEntity> {
    // Call the employeeService to retrieve the employee by ID.
    return this.employeeService.getEmployee(id)
  }
}
