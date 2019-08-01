import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@app/app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { NotenicLoggerService } from '@app/shared/logger/notenic-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  app.useLogger(app.get(NotenicLoggerService));
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Notenic Api')
    .setDescription('Notenic API description')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(3000);
}
bootstrap();
