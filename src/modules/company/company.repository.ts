import { Logger, Injectable } from '@nestjs/common'
import { PrismaService } from '@app/infrastructure/prisma/prisma.service'

@Injectable()
export class CompanyRepository {
  private readonly logger = new Logger(CompanyRepository.name)
  // Initialize prisma service
  constructor(private prisma: PrismaService) {}
}
