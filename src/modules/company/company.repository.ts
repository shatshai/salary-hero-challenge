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

  /**
   * Creates a new company with the provided data.
   * @param data - The data for creating the company.
   * @returns A Promise resolving to the created company object.
   */
  async createCompany(data: Prisma.CompanyCreateInput | Prisma.CompanyUncheckedCreateInput): Promise<Company> {
    // Use Prisma's create method to create a new company with the provided data.
    return this.prisma.company.create({
      data,
    })
  }

  /**
   * Updates an company with the provided ID using the given data.
   * @param id - The ID of the company to update.
   * @param data - The data for updating the company.
   * @returns A Promise resolving to the updated company object.
   */
  updateCompany(id: number, data: Prisma.CompanyUpdateInput | Prisma.CompanyUncheckedUpdateInput): Promise<Company> {
    // Use Prisma's update method to update the company with the provided data and ID.
    return this.prisma.company.update({
      data,
      where: {
        id,
      },
    })
  }

  /**
   * Deletes an company with the provided ID.
   * @param id - The ID of the company to delete.
   * @returns A Promise resolving to the deleted company object.
   */
  deleteCompany(id: number): Promise<Company> {
    // Use Prisma's delete method to delete the company with the provided ID.
    return this.prisma.company.delete({
      where: {
        id,
      },
    })
  }
}
