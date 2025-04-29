import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import './utils/mongoos-pginate';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ErrorHandlerInterceptor } from './common/interceptors/errorHandling.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // <-- Enables @Type(() => Number)
      },
      //to get custom error msgs added in class-validator
      exceptionFactory: (errors) => {
        const messages = errors.map((err) => ({
          field: err.property,
          errors: Object.values(err.constraints || {}),
        }));

        return new BadRequestException({
          status: 'Validation Failed',
          message: messages,
        });
      },
    }),
  );
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new ErrorHandlerInterceptor(),
  );

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port ?? 3000);

  console.log(`Server is running on port : ${port}`);
}
bootstrap();
