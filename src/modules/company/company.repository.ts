import { Logger, Injectable } from '@nestjs/common'
import { Company, Prisma } from '@prisma/client'
import { PrismaService } from '@app/infrastructure/prisma/prisma.service'

@Injectable()
export class CompanyRepository {
  private readonly logger = new Logger(CompanyRepository.name)
  // Initialize prisma service
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves companies based on the provided criteria.
   * @param companyWhereInput The criteria for filtering companies.
   * @returns A promise resolving to an array of companies with details, or null if no companies match the criteria.
   */
  async getCompanies(companyWhereInput: Prisma.CompanyWhereInput): Promise<Company[] | null> {
    return this.prisma.company.findMany<{
      where: Prisma.CompanyWhereInput
    }>({
      where: companyWhereInput,
    })
  }

  /**
   * Retrieves an company details based on the provided unique input.
   * @param companyWhereUniqueInput - The unique input identifying the company.
   * @returns A Promise resolving to an Company object or null if not found.
   */
  getCompany(companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput): Promise<Company | null> {
    // Retrieve the company details from the database.
    return this.prisma.company.findUnique<{
      where: Prisma.CompanyWhereUniqueInput
    }>({
      where: companyWhereUniqueInput,
    })
  }
}
