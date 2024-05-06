import { Type } from 'class-transformer'
import { IsInt, IsString, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SearchCompanyDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({
    required: false,
    name: 'id',
    description: 'Company ID',
    type: Number,
  })
  readonly id: number

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    name: 'name',
    description: 'Company name',
    type: String,
  })
  readonly name: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    name: 'address',
    description: 'Company address',
    type: String,
  })
  readonly address: string
}
