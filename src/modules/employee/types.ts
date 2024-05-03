import { Company, Employee, Prisma, SalaryType } from '@prisma/client'

// Define a validator to fetch employee data with company and salary type
const employeeWithCompany = Prisma.validator<Prisma.EmployeeDefaultArgs>()({
  include: { company: true, salaryType: true },
})

// Define the type for an employee with company and salary type included
export type EmployeeWithCompany = Prisma.EmployeeGetPayload<
  typeof employeeWithCompany
>

// Define a type for salary rate
export type SalaryRate = {
  salaryRate: number
}

// Extend a generic type with the salaryRate attribute
export type WithSalaryRate<T> = T & {
  salaryRate: number
}

// Define a type for an employee with company, extending it with salary type
export type EmployeeWithCompanyWithSalaryType = Employee & {
  company: Company
} & { salaryType: SalaryType }
