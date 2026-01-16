import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Avalanche Dapp Backend - Rio Febriasnyah (221011400188)')
    .setDescription('The API description for the Avalanche Fullstack Dapp.\n\nDeveloped by:\n**Name:** Rio Febriasnyah\n**NIM:** 221011400188')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
