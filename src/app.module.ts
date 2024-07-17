import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

const configService = new ConfigService();
console.log(configService.get('POSTGRESQL_DB_HOST'))
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configService.get('POSTGRESQL_DB_HOST'),
      port: configService.get('POSTGRESQL_DB_PORT'),
      password: configService.get('POSTGRESQL_DB_PASSWORD'),
      username: configService.get('POSTGRESQL_DB_USERNAME'),
      entities: ['dist/**/*.entity.js'],
      database: configService.get('POSTGRESQL_DB_DATABASE'),
      synchronize: true,
      logging: true,
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
