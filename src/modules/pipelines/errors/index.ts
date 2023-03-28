import { HttpStatus } from '@nestjs/common';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

export class PipelineNotFoundException extends HttpException {
  constructor() {
    super(`Pipeline not found`, HttpStatus.NOT_FOUND);
  }
}

@Catch(PipelineNotFoundException)
export class PipelineNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: PipelineNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    //const request = ctx.getRequest<Request>();
    const status = 404; //exception.getStatus();

    response.status(status).json({
      message: exception.message,
      error: 'PipelineNotFoundException',
      statusCode: status,
    });
  }
}

@Catch(PipelineNotFoundException)
export class RtmpPipelineNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: PipelineNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    //const request = ctx.getRequest<Request>();
    const status = 401; //exception.getStatus();
    response.status(status).json({
      message: exception.message,
      error: 'PipelineNotFoundException',
      statusCode: status,
    });
  }
}
