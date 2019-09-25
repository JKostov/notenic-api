import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@app/app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { NotenicLoggerService } from '@app/shared/logger/notenic-logger.service';
import { Transport } from '@nestjs/microservices';
import { IConfigService } from '@app/shared/config/interfaces/config.service.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: IConfigService = app.get('IConfigService');

  app.useLogger(app.get(NotenicLoggerService));
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();
  const micro = app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      url: configService.get('NATS_URL'),
    },
  });

  micro.listen(() => console.log('Connected to nats.'));

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
