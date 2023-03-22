import { Module } from '@nestjs/common';
import { BoatsService } from './boats.service';
import { BoatsController } from './boats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BoatsSchema } from './entities/boat.entity';
import { SeaPortsSchema } from '../sea-ports/entities/sea-port.entity';
import { SeaPortsService } from '../sea-ports/sea-ports.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Boats',
        schema: BoatsSchema,
      },
      { name: 'SeaPorts', schema: SeaPortsSchema },
    ]),
  ],
  controllers: [BoatsController],
  providers: [BoatsService, SeaPortsService],
})
export class BoatsModule {}
