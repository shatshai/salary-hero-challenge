import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from '@app/infrastructure/prisma/prisma.module'

// Define the main application module
@Module({
  imports: [PrismaModule], // Import the PrismaModule for database access
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
