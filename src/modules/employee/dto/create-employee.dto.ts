import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { SalaryTypes } from '@app/config/constants'

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    name: 'username',
    description: 'Employee Username',
    type: String,
  })
  readonly username: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    name: 'email',
    description: 'Employee email',
    type: String,
  })
  readonly email: string

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    name: 'companyId',
    description: 'Employee Company ID',
    type: Number,
  })
  readonly companyId: number

  @IsEnum(SalaryTypes)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    name: 'salaryTypeId',
    description: 'Employee Salary Type ID',
    enum: SalaryTypes,
  })
  readonly salaryTypeId: SalaryTypes

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    name: 'salary',
    description: 'Employee Salary',
    type: Number,
  })
  readonly salary: number

  @IsInt()
  @ApiProperty({
    required: true,
    name: 'payDate',
    description: 'Employee Salary PayDate',
    default: 1,
    type: Number,
  })
  readonly payDate?: number
}
