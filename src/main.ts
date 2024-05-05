import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { PrismaClientExceptionFilter } from '@app/common/filters/prisma-client-exception.filter'
import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Binding Swagger APIs documents
  const config = new DocumentBuilder()
    .setTitle('Salary Backend APIs')
    .setDescription('The employee salary and company backend APIs')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  // Apply the exception filter
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(3000)
}
bootstrap()
