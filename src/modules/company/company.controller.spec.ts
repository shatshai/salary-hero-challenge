import { Test, TestingModule } from '@nestjs/testing'
import { plainToInstance } from 'class-transformer'
import { CompanyController } from './company.controller'
import { CompanyService } from './company.service'
import { CompanyRepository } from './company.repository'
import { PrismaModule } from '@app/infrastructure/prisma/prisma.module'
import { Company } from '@prisma/client'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'

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

  describe('createCompany', () => {
    it('Should create and return company as expected', async () => {
      const companyData = { name: 'some company name', address: 'some company address' }
      const company = { id: 1, name: 'some company name', address: 'some company address' }
      const spyRepository = jest
        .spyOn(companyRepository, 'createCompany')
        .mockResolvedValue(company as unknown as Company)
      await expect(companyController.createCompany(plainToInstance(CreateCompanyDto, companyData))).resolves.toEqual(
        expect.objectContaining({
          id: 1,
          name: 'some company name',
        }),
      )
      expect(spyRepository).toHaveBeenCalledWith(
        expect.not.objectContaining({
          id: 1,
        }),
      )
    })
  })

  describe('updateCompany', () => {
    it('Should update and return Company as expected', async () => {
      const company = { id: 1, name: 'some company name', address: 'some company address' }
      const spyRepositoryGetCompany = jest
        .spyOn(companyRepository, 'getCompany')
        .mockResolvedValue(company as unknown as Company)
      const spyRepositoryUpdateCompany = jest
        .spyOn(companyRepository, 'updateCompany')
        .mockResolvedValue(company as unknown as Company)
      await expect(
        companyController.updateCompany(company.id, plainToInstance(UpdateCompanyDto, company)),
      ).resolves.toEqual(
        expect.objectContaining({
          id: 1,
          name: expect.any(String),
          address: expect.any(String),
        }),
      )
      expect(spyRepositoryGetCompany).toHaveBeenCalledWith({ id: 1 })
      expect(spyRepositoryUpdateCompany).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          id: 1,
        }),
      )
    })

    it('Should throw NotFoundException when cannot get Company', async () => {
      const company = { id: 1, name: 'some company name', address: 'some company address' }
      const spyRepositoryGetCompany = jest
        .spyOn(companyRepository, 'getCompany')
        .mockResolvedValue(null as unknown as Company)
      const spyRepositoryUpdateCompany = jest
        .spyOn(companyRepository, 'updateCompany')
        .mockResolvedValue(company as unknown as Company)
      await expect(
        companyController.updateCompany(company.id, plainToInstance(UpdateCompanyDto, company)),
      ).rejects.toThrow('Company not found')
      expect(spyRepositoryGetCompany).toHaveBeenCalledWith({ id: 1 })
      expect(spyRepositoryUpdateCompany).not.toHaveBeenCalled()
    })
  })

  describe('deleteCompany', () => {
    it('Should delete and return company as expected', async () => {
      const company = { id: 1, name: 'some company name', address: 'some company address' }
      const spyRepositoryGetCompany = jest
        .spyOn(companyRepository, 'getCompany')
        .mockResolvedValue(company as unknown as Company)
      const spyRepositoryDelete = jest
        .spyOn(companyRepository, 'deleteCompany')
        .mockResolvedValue(company as unknown as Company)
      await expect(companyController.deleteCompany(company.id)).resolves.toEqual(
        expect.objectContaining({
          id: 1,
          name: expect.any(String),
          address: expect.any(String),
        }),
      )
      expect(spyRepositoryGetCompany).toHaveBeenCalledWith({ id: 1 })
      expect(spyRepositoryDelete).toHaveBeenCalledWith(1)
    })

    it('Should throw NotFoundException when cannot get company', async () => {
      const company = { id: 1, name: 'some company name', address: 'some company address' }
      const spyRepositoryGetCompany = jest
        .spyOn(companyRepository, 'getCompany')
        .mockResolvedValue(null as unknown as Company)
      const spyRepositoryDelete = jest
        .spyOn(companyRepository, 'deleteCompany')
        .mockResolvedValue(company as unknown as Company)
      await expect(companyController.deleteCompany(company.id)).rejects.toThrow('Company not found')
      expect(spyRepositoryGetCompany).toHaveBeenCalledWith({ id: 1 })
      expect(spyRepositoryDelete).not.toHaveBeenCalled()
    })
  })
})
