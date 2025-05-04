import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/authentication.guard';
import { AuthorizationGuard } from './common/guards/authorization.guard';
import { CategoryModule } from './modules/category/category.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { BrandModule } from './modules/brand/brand.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { ReviewModule } from './modules/review/review.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    //connecting mongodb
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
    }),
    UserModule,
    AuthModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configServie: ConfigService) => ({
        transport: {
          host: configServie.get('HOST'),
          auth: {
            user: configServie.get('SENDER_EMAIL'),
            pass: configServie.get('SENDER_PASS'),
          },
        },
      }),
    }),
    CategoryModule,
    SubCategoryModule,
    BrandModule,
    ProductModule,
    CartModule,
    ReviewModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, //authentication guard
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard, //authorization guard
    },
  ],
})
export class AppModule {}
