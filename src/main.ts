import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const comfig = new DocumentBuilder()

  .setTitle("'TechGuard'")
  .setDescription("'Projeto TechGuard'")
  .setContact("'Projeto TechGuard'", "https://github.com/Grupo-3-Turma-JavaScript-11/TechGuard", "")
  .setVersion('1.0')
  .addBearerAuth()
  .build()
  
  const document = SwaggerModule.createDocument(app, comfig)
  SwaggerModule.setup('/swagger', app, document)


  process.env.TZ = '-03:00'

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
