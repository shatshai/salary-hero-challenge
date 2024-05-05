import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { PrismaModule } from '@app/infrastructure/prisma/prisma.module'
import { EmployeeModule } from '@app/modules/employee/employee.module'
import { CompanyModule } from '@app/modules/company/company.module'
import { LoggerMiddleware } from '@app/common/middleware/logger.middleware'

// Define the main application module
@Module({
  imports: [PrismaModule, CompanyModule, EmployeeModule], // Import the PrismaModule for database access and modules
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
