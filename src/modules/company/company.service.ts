import { Logger, Injectable, NotFoundException } from '@nestjs/common'
import { Company, Prisma } from '@prisma/client'
import { isEmpty } from 'lodash'
import { CompanyRepository } from '@app/modules/company/company.repository'
import { CreateCompanyDto } from './dto/create-company.dto'

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

  /**
   * Retrieves an company with the provided ID.
   * @param id - The ID of the company to retrieve.
   * @returns A Promise resolving to an company object.
   */
  async getCompany(id: number): Promise<Company | NotFoundException> {
    try {
      // Retrieve the company details from the repository based on the provided ID.
      const company = await this.companyRepository.getCompany({ id })

      // If company is empty, throw a NotFoundException.
      if (isEmpty(company)) {
        throw new NotFoundException('Company not found')
      }

      return company
    } catch (error) {
      // Log the error and rethrow it to the exception filter.
      this.logger.error(`GetCompany error: ${error.message}`)
      throw error
    }
  }

  /**
   * Creates a new company with the provided data and computes their salary rate.
   * @param data - The data for creating the company.
   * @returns A Promise resolving to an object containing the created company details.
   */
  async createCompany(data: CreateCompanyDto): Promise<Company | null> {
    try {
      // Call the companyRepository to create the company with the provided data.
      const company = await this.companyRepository.createCompany(data)

      // Compute and return the salary rate for the created company.
      return company
    } catch (error) {
      // Log the error and rethrow it to the exception filter.
      this.logger.error(`CreateCompany error: ${error.message}`)
      throw error
    }
  }
}
