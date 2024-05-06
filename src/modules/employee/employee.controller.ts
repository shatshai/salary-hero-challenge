import { Controller, Body, Delete, Get, Logger, Param, Post, Put, Query, NotFoundException } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger'
import { EmployeeService } from '@app/modules/employee/employee.service'
import { EmployeeWithSalaryRateEntity } from '@app/modules/employee/entities/employee-with-salary-rate.entity'
import { ParseIntPipe } from '@app/common/pipes/parse-int.pipe'
import { CreateEmployeeDto } from '@app/modules/employee/dto/create-employee.dto'
import { SearchEmployeeDto } from '@app/modules/employee/dto/search-employee.dto'
import { UpdateEmployeeDto } from '@app/modules/employee/dto/update-employee.dto'
import { CompanyService } from '../company/company.service'

@Controller('/employee')
@ApiTags('Employee')
export class EmployeeController {
  private readonly logger = new Logger(EmployeeController.name)

  // Initialize employee service
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly companyService: CompanyService,
  ) {}

  /**
   * Endpoint to retrieve an employees with filter by company id or employee email
   * @param email - The email of the employee to retrieve.
   * @param companyId - The companyId of the employee to retrieve.
   * @returns A Promise resolving to an array of object representing the employees with salary details.
   */
  @Get()
  async getEmployees(
    @Query() searchEmployeeDto: SearchEmployeeDto,
  ): Promise<EmployeeWithSalaryRateEntity[] | NotFoundException> {
    // Call the employeeService to retrieve the employees with filter by company id or employee email
    return this.employeeService.getEmployees(searchEmployeeDto)
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

  /**
   * Endpoint to create a new employee.
   * @param createEmployeeDto - The data for creating the employee.
   * @returns A Promise resolving to an object representing the created employee with salary details.
   */
  @Post()
  @ApiBody({
    description: 'Employee create details',
    type: CreateEmployeeDto,
  })
  @ApiCreatedResponse({ type: EmployeeWithSalaryRateEntity })
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto): Promise<EmployeeWithSalaryRateEntity> {
    // Call the companyService to validate company is exists.
    await this.companyService.getCompany(createEmployeeDto.companyId)

    // Call the employeeService to create the employee with the provided data.
    return this.employeeService.createEmployee(createEmployeeDto)
  }

  @Put('/:id')
  @ApiParam({
    name: 'id',
    description: 'Employee ID',
    type: Number,
  })
  @ApiBody({
    description: 'Employee update details',
    type: UpdateEmployeeDto,
  })
  @ApiCreatedResponse({ type: EmployeeWithSalaryRateEntity })
  async updateEmployee(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeWithSalaryRateEntity> {
    try {
      const employee = await this.employeeService.getEmployee(id)

      return this.employeeService.updateEmployee(employee.id, updateEmployeeDto)
    } catch (error) {
      // Log the error and rethrow it to the exception filter.
      this.logger.error(`UpdateEmployee error: ${error.message}`)
      throw error
    }
  }

  /**
   * Endpoint to delete an employee by ID.
   * @param id - The ID of the employee to delete.
   * @returns A Promise resolving to an object representing the deleted employee with salary details.
   */
  @Delete('/:id')
  @ApiParam({
    name: 'id',
    description: 'Employee ID',
    type: Number,
  })
  @ApiCreatedResponse({ type: EmployeeWithSalaryRateEntity })
  async deleteEmployee(@Param('id', new ParseIntPipe()) id: number): Promise<EmployeeWithSalaryRateEntity> {
    try {
      // Retrieve the employee details based on the provided ID.
      const employee = await this.employeeService.getEmployee(id)

      // Call the employeeService to delete the employee with the retrieved ID.
      return this.employeeService.deleteEmployee(employee.id)
    } catch (error) {
      // Log the error and rethrow it to the exception filter.
      this.logger.error(`DeleteEmployee error: ${error.message}`)
      throw error
    }
  }
}
