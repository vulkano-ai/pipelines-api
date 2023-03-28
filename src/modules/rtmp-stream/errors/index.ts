import { HttpStatus } from '@nestjs/common';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

export class UnknownRtmpAppException extends HttpException {
  constructor() {
    super(`Unknown RTMP app`, HttpStatus.NOT_FOUND);
  }
}
@Catch(UnknownRtmpAppException)
export class UnknownRtmpAppExceptionFilter implements ExceptionFilter {
  catch(exception: UnknownRtmpAppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    //const request = ctx.getRequest<Request>();
    const status = 404; //exception.getStatus();

    response.status(status).json({
      message: exception.message,
      error: 'UnknownRtmpAppException',
      statusCode: status,
    });
  }
}

export class RtmpStreamNotFoundException extends HttpException {
  constructor() {
    super(`RTMP stream not found`, HttpStatus.NOT_FOUND);
  }
}

@Catch(RtmpStreamNotFoundException)
export class RtmpStreamNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: RtmpStreamNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    //const request = ctx.getRequest<Request>();
    const status = 404; //exception.getStatus();

    response.status(status).json({
      message: exception.message,
      error: 'RtmpStreamNotFoundException',
      statusCode: status,
    });
  }
}
export class AlreadyPublishingException extends HttpException {
  constructor() {
    super(`Already publishing`, HttpStatus.NOT_FOUND);
  }
}

@Catch(AlreadyPublishingException)
export class AlreadyPublishingExceptionFilter implements ExceptionFilter {
  catch(exception: AlreadyPublishingException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    //const request = ctx.getRequest<Request>();
    const status = 401; //exception.getStatus();

    response.status(status).json({
      message: exception.message,
      error: 'AlreadyPublishingException',
      statusCode: status,
    });
  }
}
