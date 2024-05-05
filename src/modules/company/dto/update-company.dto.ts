import { IsInt, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { CreateCompanyDto } from './create-company.dto'

export class UpdateCompanyDto extends CreateCompanyDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    name: 'id',
    description: 'Company ID',
    type: Number,
  })
  readonly id: number
}
