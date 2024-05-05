import { Test, TestingModule } from '@nestjs/testing'
import { plainToInstance } from 'class-transformer'
import { Company } from '@prisma/client'
import { EmployeeController } from './employee.controller'
import { EmployeeService } from './employee.service'
import { EmployeeRepository } from './employee.repository'
import { CompanyRepository } from '@app/modules/company/company.repository'
import { PrismaModule } from '@app/infrastructure/prisma/prisma.module'
import { CompanyModule } from '@app/modules/company/company.module'
import { SalaryTypes } from '@app/config/constants'
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'
import { EmployeeWithCompanyWithSalaryType } from './types'

describe('EmployeeController', () => {
  let employeeController: EmployeeController
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let employeeService: EmployeeService
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let employeeRepository: EmployeeRepository
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let companyRepository: CompanyRepository

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CompanyModule],
      controllers: [EmployeeController],
      providers: [EmployeeService, EmployeeRepository],
    }).compile()

    employeeController = app.get<EmployeeController>(EmployeeController)
    employeeService = app.get<EmployeeService>(EmployeeService)
    employeeRepository = app.get<EmployeeRepository>(EmployeeRepository)
    companyRepository = app.get<CompanyRepository>(CompanyRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getEmployees', () => {
    it('Given found employees - Should return employees as expected', async () => {
      const employee = { id: 1, salaryTypeId: SalaryTypes.DAILY, salary: 700 }
      const spyRepository = jest
        .spyOn(employeeRepository, 'getEmployees')
        .mockResolvedValue([employee] as unknown as EmployeeWithCompanyWithSalaryType[])
      expect(employeeController.getEmployees(null, null)).resolves.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 1,
          }),
        ]),
      )
      expect(spyRepository).toHaveBeenCalledWith(
        expect.objectContaining({
          companyId: null,
          email: null,
        }),
      )
    })

    it('Given select result with empty array - Should throw not found exception', async () => {
      const spyRepository = jest
        .spyOn(employeeRepository, 'getEmployees')
        .mockResolvedValue([] as unknown as EmployeeWithCompanyWithSalaryType[])
      expect(employeeController.getEmployees(null, null)).rejects.toThrow('Employees not found')
      expect(spyRepository).toHaveBeenCalledWith(
        expect.objectContaining({
          companyId: null,
          email: null,
        }),
      )
    })

    it('Given select result with null - Should throw not found exception', async () => {
      const spyRepository = jest
        .spyOn(employeeRepository, 'getEmployees')
        .mockResolvedValue(null as unknown as EmployeeWithCompanyWithSalaryType[])
      expect(employeeController.getEmployees(null, null)).rejects.toThrow('Employees not found')
      expect(spyRepository).toHaveBeenCalledWith(
        expect.objectContaining({
          companyId: null,
          email: null,
        }),
      )
    })
  })

  describe('getEmployee', () => {
    it('Given found employee - Should return employee as expected', async () => {
      const employee = { id: 1, salaryTypeId: SalaryTypes.DAILY, salary: 700 }
      const spyRepository = jest
        .spyOn(employeeRepository, 'getEmployee')
        .mockResolvedValue(employee as unknown as EmployeeWithCompanyWithSalaryType)
      expect(employeeController.getEmployee(1)).resolves.toEqual(
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
      const spyRepository = jest
        .spyOn(employeeRepository, 'getEmployee')
        .mockResolvedValue(null as unknown as EmployeeWithCompanyWithSalaryType)
      expect(employeeController.getEmployee(1)).rejects.toThrow('Employee not found')
      expect(spyRepository).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
        }),
      )
    })
  })

  describe('createEmployee', () => {
    it('Should create and return employee as expected', async () => {
      const employeeData = { salaryTypeId: SalaryTypes.DAILY, salary: 700, companyId: 1 }
      const employee = { id: 1, salaryTypeId: SalaryTypes.DAILY, salary: 700 }
      const company = { id: 1, name: 'some company name', address: 'some company address' }
      const spyCompanyRepository = jest
        .spyOn(companyRepository, 'getCompany')
        .mockResolvedValue(company as unknown as Company)
      const spyRepository = jest
        .spyOn(employeeRepository, 'createEmployee')
        .mockResolvedValue(employee as unknown as EmployeeWithCompanyWithSalaryType)
      await expect(
        employeeController.createEmployee(plainToInstance(CreateEmployeeDto, employeeData)),
      ).resolves.toEqual(
        expect.objectContaining({
          id: 1,
          salaryRate: expect.any(Number),
        }),
      )
      expect(spyRepository).toHaveBeenCalledWith(
        expect.not.objectContaining({
          id: 1,
        }),
      )
      expect(spyCompanyRepository).toHaveBeenCalledWith(
        expect.objectContaining({
          id: employeeData.companyId,
        }),
      )
    })

    it('Given invalid company - should throw exception', async () => {
      const employeeData = { salaryTypeId: SalaryTypes.DAILY, salary: 700, companyId: 100 }
      const employee = { id: 1, salaryTypeId: SalaryTypes.DAILY, salary: 700 }
      const spyCompanyRepository = jest
        .spyOn(companyRepository, 'getCompany')
        .mockResolvedValue(null as unknown as Company)
      const spyRepository = jest
        .spyOn(employeeRepository, 'createEmployee')
        .mockResolvedValue(employee as unknown as EmployeeWithCompanyWithSalaryType)
      await expect(employeeController.createEmployee(plainToInstance(CreateEmployeeDto, employeeData))).rejects.toThrow(
        'Company not found',
      )
      expect(spyRepository).not.toHaveBeenCalled()
      expect(spyCompanyRepository).toHaveBeenCalledWith(
        expect.objectContaining({
          id: employeeData.companyId,
        }),
      )
    })
  })

  describe('updateEmployee', () => {
    it('Should update and return employee as expected', async () => {
      const employee = { id: 1, salaryTypeId: SalaryTypes.DAILY, salary: 700 }
      const spyRepositoryGetEmployee = jest
        .spyOn(employeeRepository, 'getEmployee')
        .mockResolvedValue(employee as unknown as EmployeeWithCompanyWithSalaryType)
      const spyRepositoryUpdateEmployee = jest
        .spyOn(employeeRepository, 'updateEmployee')
        .mockResolvedValue(employee as unknown as EmployeeWithCompanyWithSalaryType)
      await expect(
        employeeController.updateEmployee(employee.id, plainToInstance(UpdateEmployeeDto, employee)),
      ).resolves.toEqual(
        expect.objectContaining({
          id: 1,
          salaryRate: expect.any(Number),
        }),
      )
      expect(spyRepositoryGetEmployee).toHaveBeenCalledWith({ id: 1 })
      expect(spyRepositoryUpdateEmployee).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          id: 1,
        }),
      )
    })

    it('Should throw NotFoundException when cannot get employee', async () => {
      const employee = { id: 1, salaryTypeId: SalaryTypes.DAILY, salary: 700 }
      const spyRepositoryGetEmployee = jest
        .spyOn(employeeRepository, 'getEmployee')
        .mockResolvedValue(null as unknown as EmployeeWithCompanyWithSalaryType)
      const spyRepositoryUpdateEmployee = jest
        .spyOn(employeeRepository, 'updateEmployee')
        .mockResolvedValue(employee as unknown as EmployeeWithCompanyWithSalaryType)
      await expect(
        employeeController.updateEmployee(employee.id, plainToInstance(UpdateEmployeeDto, employee)),
      ).rejects.toThrow('Employee not found')
      expect(spyRepositoryGetEmployee).toHaveBeenCalledWith({ id: 1 })
      expect(spyRepositoryUpdateEmployee).not.toHaveBeenCalled()
    })
  })

  describe('deleteEmployee', () => {
    it('Should delete and return employee as expected', async () => {
      const employee = { id: 1, salaryTypeId: SalaryTypes.DAILY, salary: 700 }
      const spyRepositoryGetEmployee = jest
        .spyOn(employeeRepository, 'getEmployee')
        .mockResolvedValue(employee as unknown as EmployeeWithCompanyWithSalaryType)
      const spyRepositoryDelete = jest
        .spyOn(employeeRepository, 'deleteEmployee')
        .mockResolvedValue(employee as unknown as EmployeeWithCompanyWithSalaryType)
      await expect(employeeController.deleteEmployee(employee.id)).resolves.toEqual(
        expect.objectContaining({
          id: 1,
          salaryRate: expect.any(Number),
        }),
      )
      expect(spyRepositoryGetEmployee).toHaveBeenCalledWith({ id: 1 })
      expect(spyRepositoryDelete).toHaveBeenCalledWith(1)
    })

    it('Should throw NotFoundException when cannot get employee', async () => {
      const employee = { id: 1, salaryTypeId: SalaryTypes.DAILY, salary: 700 }
      const spyRepositoryGetEmployee = jest
        .spyOn(employeeRepository, 'getEmployee')
        .mockResolvedValue(null as unknown as EmployeeWithCompanyWithSalaryType)
      const spyRepositoryDelete = jest
        .spyOn(employeeRepository, 'deleteEmployee')
        .mockResolvedValue(employee as unknown as EmployeeWithCompanyWithSalaryType)
      await expect(employeeController.deleteEmployee(employee.id)).rejects.toThrow('Employee not found')
      expect(spyRepositoryGetEmployee).toHaveBeenCalledWith({ id: 1 })
      expect(spyRepositoryDelete).not.toHaveBeenCalled()
    })
  })
})
