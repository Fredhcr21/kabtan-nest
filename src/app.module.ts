import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import dataBaseConfig from './config/db.interface';
const userPass =
  dataBaseConfig.mongoUser && dataBaseConfig.mongoPassword
    ? `${dataBaseConfig.mongoUser}:${dataBaseConfig.mongoPassword}@`
    : '';
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${userPass}${dataBaseConfig.mongoHost}:${dataBaseConfig.mongoPort}/${dataBaseConfig.mongoDB}`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
