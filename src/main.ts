import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Obter ConfigService para acessar variáveis de ambiente
  const configService = app.get(ConfigService);

  // Configuração do Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Airsoft API')
    .setDescription('Documentação da API para o aplicativo de airsoft')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Porta configurável via ambiente, com fallback para 3333
  const port = configService.get<number>('PORT') ?? 3333;

  console.log(`Servidor rodando na porta ${port}`);
  await app.listen(port);
}
bootstrap();
