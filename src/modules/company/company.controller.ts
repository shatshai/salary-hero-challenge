import { Controller, Get, NotFoundException, Logger, Param, Query } from '@nestjs/common'
import { ApiParam, ApiQuery } from '@nestjs/swagger'
import { Company } from '@prisma/client'
import { CompanyService } from '@app/modules/company/company.service'
import { ParseIntPipe } from '@app/common/pipes/parse-int.pipe'

@Controller('/company')
export class CompanyController {
  private readonly logger = new Logger(CompanyController.name)
  // Initialize company service
  constructor(private readonly companyService: CompanyService) {}

  /**
   * Company to retrieve an companies with filter by id or name
   * @param id - The company id of the company to retrieve.
   * @param name - The name of the company to retrieve.
   * @returns A Promise resolving to an array of object representing the companies with details.
   */
  @Get()
  @ApiQuery({
    name: 'name',
    description: 'Company name',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'id',
    description: 'Company ID',
    required: false,
    type: Number,
  })
  async getCompanies(@Query('id') id: number, @Query('name') name: string): Promise<Company[] | NotFoundException> {
    // Call the companyService to retrieve the companies with filter by company id or company name
    return this.companyService.getCompanies({
      name,
      id,
    })
  }

  /**
   * Endpoint to retrieve an company by ID.
   * @param id - The ID of the company to retrieve.
   * @returns A Promise resolving to a object representing the company.
   */
  @Get('/:id')
  @ApiParam({
    name: 'id',
    description: 'Company ID',
    type: Number,
  })
  async getCompany(@Param('id', new ParseIntPipe()) id: number): Promise<Company | NotFoundException> {
    // Call the companyService to retrieve the company by ID.
    return this.companyService.getCompany(id)
  }
}
