import { Controller, Get, Logger, Query, NotFoundException } from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'
import { EmployeeService } from '@app/modules/employee/employee.service'
import { EmployeeWithSalaryRateEntity } from '@app/modules/employee/entities/employee-with-salary-rate.entity'

@Controller('/employee')
export class EmployeeController {
  private readonly logger = new Logger(EmployeeController.name)

  // Initialize employee service
  constructor(private readonly employeeService: EmployeeService) {}

  // Get employees endpoint with optional query parameters for filtering
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
    return this.employeeService.getEmployees({
      email,
      companyId,
    })
  }
}
