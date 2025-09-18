import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //swagger for api ui
   const config = new DocumentBuilder()
     .setTitle('Blog API')
     .setDescription('API for Blog Project')
     .setVersion('1.0')
     .addBearerAuth() // optional: for JWT auth
     .build();

   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
