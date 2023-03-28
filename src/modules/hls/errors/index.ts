import { HttpStatus } from '@nestjs/common';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

export class WrongPipelineOutputException extends HttpException {
  constructor() {
    super(
      `Pipeline does not have any internal HLS output`,
      HttpStatus.BAD_REQUEST,
    );
  }
}

@Catch(WrongPipelineOutputException)
export class PipelineNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: WrongPipelineOutputException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    //const request = ctx.getRequest<Request>();
    const status = 404; //exception.getStatus();

    response.status(status).json({
      message: exception.message,
      error: 'WrongPipelineOutputException',
      statusCode: status,
    });
  }
}
