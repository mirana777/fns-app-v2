import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // http filter
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  // validation
  app.useGlobalPipes(
    new ValidationPipe({
      dismissDefaultMessages: false,
    }),
  );
  // cors
  app.enableCors()
  await app.listen(7001);
}
bootstrap();
