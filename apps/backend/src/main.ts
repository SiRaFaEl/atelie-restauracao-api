import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { SeedService } from './shared/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para o frontend Angular
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const errorsByField = errors.reduce<Record<string, string[]>>(
          (acc, error) => {
            acc[error.property] = Object.values(error.constraints ?? {});
            return acc;
          },
          {},
        );

        const mensagens = Object.values(errorsByField).flat();

        return new BadRequestException({
          message:
            mensagens[0] ??
            'Verifique os campos informados e tente novamente.',
          errors: errorsByField,
        });
      },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Ateliê Restauração API')
    .setDescription('API para gerenciamento de ateliês e projetos de móveis')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Executar seed do usuário admin
  const seedService = app.get(SeedService);
  await seedService.seedAdminUser();

  await app.listen(3000);
  console.log('✓ Backend rodando em http://localhost:3000');
  console.log('✓ Swagger disponível em http://localhost:3000/docs');
}
bootstrap();
