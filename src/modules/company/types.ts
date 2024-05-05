import { Prisma } from '@prisma/client'

// Define a validator to fetch company data with employees
const companyWithEmployees = Prisma.validator<Prisma.CompanyDefaultArgs>()({
  include: { employeeies: true },
})

// Define the type for an employee with company and salary type included
export type CompanyWithEmployees = Prisma.CompanyGetPayload<typeof companyWithEmployees>
