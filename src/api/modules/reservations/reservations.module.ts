import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { BoatsService } from '../boats/boats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationsSchema } from './entities/reservation.entity';
import { BoatsSchema } from '../boats/entities/boat.entity';
import { SeaPortsSchema } from '../sea-ports/entities/sea-port.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Reservations', schema: ReservationsSchema },
      { name: 'Boats', schema: BoatsSchema },
      { name: 'SeaPorts', schema: SeaPortsSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, BoatsService],
})
export class ReservationsModule {}
