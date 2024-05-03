import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from '@app/infrastructure/prisma/prisma.module'
import { EmployeeModule } from '@app/modules/employee/employee.module'
import { LoggerMiddleware } from '@app/common/middleware/logger.middleware'

// Define the main application module
@Module({
  imports: [PrismaModule, EmployeeModule], // Import the PrismaModule for database access and EmployeeModule
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
