import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Set up Swagger documentation before setting global prefix
  const config = new DocumentBuilder()
    .setTitle('LLM Meter Backend API')
    .setDescription('API for tracking and monitoring LLM usage, costs, and performance across multiple providers (OpenAI, Anthropic, Ollama, etc.)')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', in: 'header', name: 'X-API-KEY' }, 'api-key')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string,
    ) => `${controllerKey}_${methodKey}`,
  });

  // Add the global prefix to all paths in the Swagger document
  const prefixedDocument = {
    ...document,
    paths: Object.keys(document.paths).reduce((acc, path) => {
      acc[`/api${path}`] = document.paths[path];
      return acc;
    }, {}),
  };

  // Set up Swagger documentation at the correct path
  SwaggerModule.setup('docs', app, prefixedDocument);

  // Global prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`LLM Meter Backend running on: http://localhost:${port}`);
  console.log(`API available at: http://localhost:${port}/api`);
  console.log(`API Documentation available at: http://localhost:${port}/docs`);
}

bootstrap();
