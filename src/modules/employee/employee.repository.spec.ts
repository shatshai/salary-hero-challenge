import { Test, TestingModule } from '@nestjs/testing'
import { EmployeeRepository } from './employee.repository'
import { PrismaModule } from '@app/infrastructure/prisma/prisma.module'
import { PrismaService } from '@app/infrastructure/prisma/prisma.service'
import { Employee } from '@prisma/client'
import { SalaryTypes } from '@app/config/constants'
import { EmployeeWithCompany } from './types'

describe('EmployeeRepository', () => {
  let employeeRepository: EmployeeRepository
  let prismaService: PrismaService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [EmployeeRepository],
    }).compile()

    employeeRepository = app.get<EmployeeRepository>(EmployeeRepository)
    prismaService = app.get<PrismaService>(PrismaService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getEmployees', () => {
    it('Given found employees - Should return employees as expected', async () => {
      const employee = { id: 1, salaryTypeId: SalaryTypes.DAILY, salary: 700, companyId: 100 }
      const spyPrismaService = jest
        .spyOn(prismaService.employee, 'findMany')
        .mockResolvedValue([employee] as unknown as EmployeeWithCompany[])
      await expect(
        employeeRepository.getEmployees({
          email: 'some email',
        }),
      ).resolves.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            companyId: expect.any(Number),
          }),
        ]),
      )
      expect(spyPrismaService).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            email: expect.any(String),
          },
        }),
      )
    })
  })

  describe('getEmployee', () => {
    it('Given found employee - Should return employee as expected', async () => {
      const employee = { id: 1, salaryTypeId: SalaryTypes.DAILY, salary: 700, companyId: 100 }
      const spyPrismaService = jest
        .spyOn(prismaService.employee, 'findUnique')
        .mockResolvedValue(employee as unknown as EmployeeWithCompany)
      await expect(
        employeeRepository.getEmployee({
          id: 1,
        }),
      ).resolves.toEqual(
        expect.objectContaining({
          id: 1,
          companyId: expect.any(Number),
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

  describe('createEmployee', () => {
    it('Should create and return employee as expected', async () => {
      const employeeData = {
        username: 'some user name',
        email: 'some email',
        salaryTypeId: SalaryTypes.DAILY,
        salary: 700,
        companyId: 100,
      }
      const employee = { id: 1, salaryTypeId: SalaryTypes.DAILY, salary: 700, companyId: 100 }
      const spyPrismaService = jest
        .spyOn(prismaService.employee, 'create')
        .mockResolvedValue(employee as unknown as EmployeeWithCompany)
      await expect(employeeRepository.createEmployee(employeeData)).resolves.toEqual(
        expect.objectContaining({
          id: 1,
          companyId: expect.any(Number),
        }),
      )
      expect(spyPrismaService).toHaveBeenCalledWith({
        data: employeeData,
      })
    })
  })

  describe('updateEmployee', () => {
    it('Should update and return employee as expected', async () => {
      const employee = { id: 1, salaryTypeId: SalaryTypes.DAILY, salary: 700, companyId: 100 }
      const spyPrismaService = jest
        .spyOn(prismaService.employee, 'update')
        .mockResolvedValue(employee as unknown as Employee)
      await expect(employeeRepository.updateEmployee(employee.id, employee)).resolves.toEqual(
        expect.objectContaining({
          id: 1,
          companyId: expect.any(Number),
        }),
      )
      expect(spyPrismaService).toHaveBeenCalledWith({
        where: { id: 1 },
        data: expect.objectContaining(employee),
      })
    })
  })

  describe('deleteEmployee', () => {
    it('Should delete and return employee as expected', async () => {
      const employee = { id: 1, salaryTypeId: SalaryTypes.DAILY, salary: 700, companyId: 100 }
      const spyPrismaService = jest
        .spyOn(prismaService.employee, 'delete')
        .mockResolvedValue(employee as unknown as Employee)
      await expect(employeeRepository.deleteEmployee(employee.id)).resolves.toEqual(
        expect.objectContaining({
          id: 1,
          companyId: expect.any(Number),
        }),
      )
      expect(spyPrismaService).toHaveBeenCalledWith({
        where: { id: 1 },
      })
    })
  })
})
