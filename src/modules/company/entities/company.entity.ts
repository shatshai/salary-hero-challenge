import { ApiProperty } from '@nestjs/swagger'
import { Company } from '@prisma/client'

export class CompanyEntity implements Company {
  @ApiProperty({
    name: 'id',
    description: 'Company ID',
    type: Number,
  })
  readonly id: number

  @ApiProperty({
    name: 'name',
    description: 'Company name',
    type: String,
  })
  readonly name: string

  @ApiProperty({
    name: 'address',
    description: 'Company address',
    type: String,
  })
  readonly address: string
}
