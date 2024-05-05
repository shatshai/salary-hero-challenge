import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    name: 'name',
    description: 'Company name',
    type: String,
  })
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    name: 'address',
    description: 'Company address',
    type: String,
  })
  readonly address: string
}
