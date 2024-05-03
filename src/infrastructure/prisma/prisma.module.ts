import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

// Define a module for Prisma services
@Module({
  providers: [PrismaService], // Provide PrismaService as a provider
  exports: [PrismaService], // Export PrismaService for dependency injection in other modules
})
export class PrismaModule {}
