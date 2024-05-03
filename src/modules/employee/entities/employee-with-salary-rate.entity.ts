import { ApiProperty } from '@nestjs/swagger'
import { Employee } from '@prisma/client'
import { SalaryTypes } from '@app/config/constants'

export class EmployeeWithSalaryRateEntity implements Employee {
  @ApiProperty({
    name: 'id',
    description: 'Employee ID',
    type: Number,
  })
  readonly id: number

  @ApiProperty({
    name: 'username',
    description: 'Employee Username',
    type: String,
  })
  readonly username: string

  @ApiProperty({
    name: 'email',
    description: 'Employee email',
    type: String,
  })
  readonly email: string

  @ApiProperty({
    name: 'companyId',
    description: 'Employee Company ID',
    type: Number,
  })
  readonly companyId: number

  @ApiProperty({
    name: 'salaryTypeId',
    description: 'Employee Salary Type ID',
    enum: SalaryTypes,
  })
  readonly salaryTypeId: SalaryTypes

  @ApiProperty({
    name: 'salary',
    description: 'Employee Salary',
    type: Number,
  })
  readonly salary: number

  @ApiProperty({
    name: 'payDate',
    description: 'Employee Salary PayDate',
    type: Number,
  })
  readonly payDate: number
}
