import { Logger, Injectable } from '@nestjs/common'
import { CompanyRepository } from '@app/modules/company/company.repository'

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name)

  // Initialize company repository service
  constructor(private readonly companyRepository: CompanyRepository) {}
}
