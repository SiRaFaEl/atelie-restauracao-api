"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const all_exceptions_filter_1 = require("./shared/filters/all-exceptions.filter");
const common_1 = require("@nestjs/common");
const seed_service_1 = require("./shared/seed/seed.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:4200', 'http://localhost:3000'],
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        exceptionFactory: (errors) => {
            const errorsByField = errors.reduce((acc, error) => {
                acc[error.property] = Object.values(error.constraints ?? {});
                return acc;
            }, {});
            const mensagens = Object.values(errorsByField).flat();
            return new common_1.BadRequestException({
                message: mensagens[0] ??
                    'Verifique os campos informados e tente novamente.',
                errors: errorsByField,
            });
        },
    }));
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Ateliê Restauração API')
        .setDescription('API para gerenciamento de ateliês e projetos de móveis')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const seedService = app.get(seed_service_1.SeedService);
    await seedService.seedAdminUser();
    await app.listen(3000);
    console.log('✓ Backend rodando em http://localhost:3000');
    console.log('✓ Swagger disponível em http://localhost:3000/docs');
}
bootstrap();
//# sourceMappingURL=main.js.map