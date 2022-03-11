import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false, // Will remove extra properties, but not throw an error
    }),
  );
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10000, // limit each IP to 100 requests per windowMs
    }),
  );

  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('TODO API Server')
    .setDescription('TODO API Server Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
