import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message)
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const message = exception.message.replace(/\n/g, '')

    switch (exception.code) {
      case 'P2000': {
        const status = HttpStatus.BAD_REQUEST
        response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: message,
        })
        break
      }
      case 'P2021':
      case 'P2002': {
        const status = HttpStatus.CONFLICT
        response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: message,
        })
        break
      }
      default:
        // default 500 error code
        super.catch(exception, host)
        break
    }
  }
}
