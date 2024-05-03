import { Injectable } from '@nestjs/common'
import { PrismaService } from '@app/infrastructure/prisma/prisma.service'

@Injectable()
export class EmployeeRepository {
  // Initialize prisma service
  constructor(private prisma: PrismaService) {}
}
