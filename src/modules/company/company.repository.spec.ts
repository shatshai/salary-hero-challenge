import { Test, TestingModule } from '@nestjs/testing'
import { CompanyRepository } from './company.repository'
import { PrismaModule } from '@app/infrastructure/prisma/prisma.module'
import { PrismaService } from '@app/infrastructure/prisma/prisma.service'
import { Company } from '@prisma/client'

describe('CompanyRepository', () => {
  let companyRepository: CompanyRepository
  let prismaService: PrismaService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CompanyRepository],
    }).compile()

    companyRepository = app.get<CompanyRepository>(CompanyRepository)
    prismaService = app.get<PrismaService>(PrismaService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getCompanies', () => {
    it('Given found Companies - Should return companies as expected', async () => {
      const company = { id: 1, name: 'some company name', address: 'some company address' }
      const spyPrismaService = jest
        .spyOn(prismaService.company, 'findMany')
        .mockResolvedValue([company] as unknown as Company[])
      await expect(
        companyRepository.getCompanies({
          name: 'some company name',
        }),
      ).resolves.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
          }),
        ]),
      )
      expect(spyPrismaService).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            name: expect.any(String),
          },
        }),
      )
    })
  })

  describe('getCompany', () => {
    it('Given found Company - Should return company as expected', async () => {
      const company = { id: 1, name: 'some company name', address: 'some company address' }
      const spyPrismaService = jest
        .spyOn(prismaService.company, 'findUnique')
        .mockResolvedValue(company as unknown as Company)
      await expect(
        companyRepository.getCompany({
          id: 1,
        }),
      ).resolves.toEqual(
        expect.objectContaining({
          id: 1,
          name: expect.any(String),
        }),
      )
      expect(spyPrismaService).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 1,
          },
        }),
      )
    })
  })

  describe('getCompanyWithEmployees', () => {
    it('Given found Company - Should return Company and companys employees as expected', async () => {
      const company = { id: 1, name: 'some company name', address: 'some company address', employees: [] }
      const spyPrismaService = jest
        .spyOn(prismaService.company, 'findUnique')
        .mockResolvedValue(company as unknown as Company)
      await expect(
        companyRepository.getCompanyWithEmployees({
          id: 1,
        }),
      ).resolves.toEqual(
        expect.objectContaining({
          id: 1,
          name: expect.any(String),
        }),
      )
      expect(spyPrismaService).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: 1,
          },
        }),
      )
    })
  })

  describe('createCompany', () => {
    it('Should create and return company as expected', async () => {
      const companyData = { name: 'some company name', address: 'some company address' }
      const company = { id: 1, name: 'some company name', address: 'some company address' }
      const spyPrismaService = jest
        .spyOn(prismaService.company, 'create')
        .mockResolvedValue(company as unknown as Company)
      await expect(companyRepository.createCompany(companyData)).resolves.toEqual(
        expect.objectContaining({
          id: 1,
          name: expect.any(String),
        }),
      )
      expect(spyPrismaService).toHaveBeenCalledWith({
        data: companyData,
      })
    })
  })

  describe('updateCompany', () => {
    it('Should update and return company as expected', async () => {
      const company = { id: 1, name: 'some company name', address: 'some company address' }
      const spyPrismaService = jest
        .spyOn(prismaService.company, 'update')
        .mockResolvedValue(company as unknown as Company)
      await expect(companyRepository.updateCompany(company.id, company)).resolves.toEqual(
        expect.objectContaining({
          id: 1,
          name: expect.any(String),
        }),
      )
      expect(spyPrismaService).toHaveBeenCalledWith({
        where: { id: 1 },
        data: expect.objectContaining(company),
      })
    })
  })

  describe('deleteCompany', () => {
    it('Should delete and return company as expected', async () => {
      const company = { id: 1, name: 'some company name', address: 'some company address' }
      const spyPrismaService = jest
        .spyOn(prismaService.company, 'delete')
        .mockResolvedValue(company as unknown as Company)
      await expect(companyRepository.deleteCompany(company.id)).resolves.toEqual(
        expect.objectContaining({
          id: 1,
          name: expect.any(String),
        }),
      )
      expect(spyPrismaService).toHaveBeenCalledWith({
        where: { id: 1 },
      })
    })
  })
})
