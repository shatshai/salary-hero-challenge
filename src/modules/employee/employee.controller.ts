import { Controller } from '@nestjs/common'
import { EmployeeService } from '@app/modules/employee/employee.service'

@Controller('/employee')
export class EmployeeController {
  // Initialize employee service
  constructor(private readonly employeeService: EmployeeService) {}
}
