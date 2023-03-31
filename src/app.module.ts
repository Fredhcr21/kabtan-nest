import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeaPortsModule } from './api/modules/sea-ports/sea-ports.module';
import { BoatsModule } from './api/modules/boats/boats.module';
import { ReservationsModule } from './api/modules/reservations/reservations.module';
// import dataBaseConfig from './config/db.interface';
// const userPass =
//   dataBaseConfig.mongoUser && dataBaseConfig.mongoPassword
//     ? `${dataBaseConfig.mongoUser}:${dataBaseConfig.mongoPassword}@`
//     : '';
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost/db`),
    SeaPortsModule,
    BoatsModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
