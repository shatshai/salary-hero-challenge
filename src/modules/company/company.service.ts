import { Logger, Injectable, NotFoundException } from '@nestjs/common'
import { Company, Prisma } from '@prisma/client'
import { isEmpty } from 'lodash'
import { CompanyRepository } from '@app/modules/company/company.repository'

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name)

  // Initialize company repository service
  constructor(private readonly companyRepository: CompanyRepository) {}

  /**
   * Retrieves companies based on the provided criteria and computes their salary rates.
   * @param companyWhereInput The criteria for filtering companies.
   * @returns A promise resolving to an array of companies, or null if no companies match the criteria.
   */
  async getCompanies(companyWhereInput: Prisma.CompanyWhereInput): Promise<Company[] | NotFoundException> {
    try {
      // Retrieve companies from the repository based on the input criteria
      const companies = await this.companyRepository.getCompanies(companyWhereInput)

      if (isEmpty(companies)) {
        throw new NotFoundException('Company not found')
      }

      return companies
    } catch (error) {
      // Logging error and throw to exception filter
      this.logger.error(`GetCompanies error: ${error.message}`)
      throw error
    }
  }
}
