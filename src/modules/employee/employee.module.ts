import { Module } from '@nestjs/common'
import { EmployeeController } from '@app/modules/employee/employee.controller'
import { EmployeeService } from '@app/modules/employee/employee.service'
import { EmployeeRepository } from '@app/modules/employee/employee.repository'
import { PrismaModule } from '@app/infrastructure/prisma/prisma.module'

@Module({
  imports: [PrismaModule], // Import the PrismaModule for database access
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
})
export class EmployeeModule {}
