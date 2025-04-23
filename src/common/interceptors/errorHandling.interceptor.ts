import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class ErrorHandlerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): any {
    return next.handle().pipe(
      catchError((error) => {
        const res = context.switchToHttp().getResponse();
        const status =
          error instanceof HttpException
            ? error.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        return res.status(status).json({
          status: 'Error',
          error: error.message,
          stack: error.stack,
        });
      }),
    );
  }
}
