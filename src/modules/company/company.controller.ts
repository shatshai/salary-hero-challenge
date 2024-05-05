import { Controller, Logger } from '@nestjs/common'
import { CompanyService } from '@app/modules/company/company.service'

@Controller('/company')
export class CompanyController {
  private readonly logger = new Logger(CompanyController.name)
  // Initialize company service
  constructor(private readonly companyService: CompanyService) {}
}
