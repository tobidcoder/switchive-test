import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Switchive services')
    .setDescription('Switchive API Docs')
    .setVersion('1.0')
    .addTag('Switchive Api')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  const options = new DocumentBuilder().addBearerAuth();

  SwaggerModule.setup('api', app, document);


  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine('ejs')
  app.enableCors();

  await app.listen(port);
  console.log(
    `Tobi welcome you to new world at PORT: ${port}, Available at http://localhost:${port}/api Enjoy!`,
  );

}
bootstrap();

