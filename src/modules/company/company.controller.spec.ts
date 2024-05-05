import { Test, TestingModule } from '@nestjs/testing'
import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'
import { CompanyRepository } from './company.repository'
import { PrismaModule } from '@app/infrastructure/prisma/prisma.module'
import { Company } from '@prisma/client'

describe('CompanyController', () => {
  let companyController: CompanyController
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let companyService: CompanyService
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let companyRepository: CompanyRepository

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [CompanyController],
      providers: [CompanyService, CompanyRepository],
    }).compile()

    companyController = app.get<CompanyController>(CompanyController)
    companyService = app.get<CompanyService>(CompanyService)
    companyRepository = app.get<CompanyRepository>(CompanyRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getCompanies', () => {
    it('Given found Companies - Should return Companies as expected', async () => {
      const company = { id: 1, name: 'some company name', address: 'some company address' }
      const spyRepository = jest
        .spyOn(companyRepository, 'getCompanies')
        .mockResolvedValue([company] as unknown as Company[])
      expect(companyController.getCompanies(null, null)).resolves.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 1,
          }),
        ]),
      )
      expect(spyRepository).toHaveBeenCalledWith(
        expect.objectContaining({
          id: null,
          name: null,
        }),
      )
    })

    it('Given select result with empty array - Should throw not found exception', async () => {
      const spyRepository = jest.spyOn(companyRepository, 'getCompanies').mockResolvedValue([] as unknown as Company[])
      expect(companyController.getCompanies(null, null)).rejects.toThrow('Company not found')
      expect(spyRepository).toHaveBeenCalledWith(
        expect.objectContaining({
          id: null,
          name: null,
        }),
      )
    })

    it('Given select result with null - Should throw not found exception', async () => {
      const spyRepository = jest
        .spyOn(companyRepository, 'getCompanies')
        .mockResolvedValue(null as unknown as Company[])
      expect(companyController.getCompanies(null, null)).rejects.toThrow('Company not found')
      expect(spyRepository).toHaveBeenCalledWith(
        expect.objectContaining({
          id: null,
          name: null,
        }),
      )
    })
  })

  describe('getCompany', () => {
    it('Given found company- Should return company as expected', async () => {
      const company = { id: 1, name: 'some company name', address: 'some company address' }
      const spyRepository = jest.spyOn(companyRepository, 'getCompany').mockResolvedValue(company as unknown as Company)
      expect(companyController.getCompany(1)).resolves.toEqual(
        expect.objectContaining({
          id: 1,
        }),
      )
      expect(spyRepository).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
        }),
      )
    })

    it('Given select result with null - Should throw not found exception', async () => {
      const spyRepository = jest.spyOn(companyRepository, 'getCompany').mockResolvedValue(null as unknown as Company)
      expect(companyController.getCompany(1)).rejects.toThrow('Company not found')
      expect(spyRepository).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
        }),
      )
    })
  })
})
