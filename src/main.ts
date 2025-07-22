import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './common/interceptor/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: ['error', 'warn', 'log']});

  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
