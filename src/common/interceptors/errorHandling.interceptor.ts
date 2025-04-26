import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, ObservableInput, tap, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): any {
    return next.handle().pipe(
      tap((res) => {}),
      catchError((error): ObservableInput<HttpException> => {
        const res = context.switchToHttp().getResponse();
        const status =
          error instanceof HttpException
            ? error.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        const errObj = {
          status: 'Error',
          error: error.message,
          stack: error.stack,
        };
        return throwError(() => new HttpException(errObj, status));
      }),
    );
  }
}
