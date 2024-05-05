import { Module } from '@nestjs/common'
import { CompanyController } from '@app/modules/company/company.controller'
import { CompanyService } from '@app/modules/company/company.service'
import { CompanyRepository } from '@app/modules/company/company.repository'
import { PrismaModule } from '@app/infrastructure/prisma/prisma.module'

@Module({
  imports: [PrismaModule], // Import the PrismaModule for database access
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
  exports: [CompanyService], // Export CompanyService for dependency injection in other modules
})
export class CompanyModule {}
