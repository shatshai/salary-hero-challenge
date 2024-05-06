import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsString, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { SalaryTypes } from '@app/config/constants'

export class SearchEmployeeDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({
    required: false,
    name: 'id',
    description: 'Employee ID',
    type: Number,
  })
  readonly id: number

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    name: 'username',
    description: 'Employee Username',
    type: String,
  })
  readonly username: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    name: 'email',
    description: 'Employee email',
    type: String,
  })
  readonly email: string

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({
    required: false,
    name: 'companyId',
    description: 'Employee Company ID',
    type: Number,
  })
  readonly companyId: number

  @IsEnum(SalaryTypes)
  @IsOptional()
  @ApiProperty({
    required: false,
    name: 'salaryTypeId',
    description: 'Employee Salary Type ID',
    enum: SalaryTypes,
    type: Number,
  })
  readonly salaryTypeId: SalaryTypes

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({
    required: false,
    name: 'salary',
    description: 'Employee Salary',
    type: Number,
  })
  readonly salary: number

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({
    required: false,
    name: 'payDate',
    description: 'Employee Salary PayDate',
    type: Number,
  })
  readonly payDate?: number
}
