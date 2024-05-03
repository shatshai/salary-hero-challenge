import { Injectable } from '@nestjs/common'
import { EmployeeRepository } from '@app/modules/employee/employee.repository'

@Injectable()
export class EmployeeService {
  // Initialize employee repository service
  constructor(private readonly employeeRepository: EmployeeRepository) {}
}
