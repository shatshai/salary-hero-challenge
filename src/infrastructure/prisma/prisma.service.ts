import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
// Extend PrismaClient and implement OnModuleInit interface
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Initialize PrismaClient with custom logging configuration
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'colorless', // Disable color formatting for errors
    })
  }

  // Method called when the module is initialized
  async onModuleInit() {
    // Connect to the database
    await this.$connect()
  }
}
