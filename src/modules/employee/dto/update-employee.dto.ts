import { IsInt, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { CreateEmployeeDto } from './create-employee.dto'

export class UpdateEmployeeDto extends CreateEmployeeDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    name: 'id',
    description: 'Employee ID',
    type: Number,
  })
  readonly id: number
}
