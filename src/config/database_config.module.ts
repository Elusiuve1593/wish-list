import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '..', '.env'),
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('TYPEORM_HOST'),
        port: configService.getOrThrow('TYPEORM_PORT'),
        database: configService.getOrThrow('TYPEORM_DATABASE'),
        username: configService.getOrThrow('TYPEORM_USERNAME'),
        synchronize: configService.getOrThrow('TYPEORM_SYNC'),
        autoLoadEntities: configService.getOrThrow('TYPEORM_AUTO'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule, TypeOrmModule, ConfigModule],
})
export class DatabaseConfigureModule {}
