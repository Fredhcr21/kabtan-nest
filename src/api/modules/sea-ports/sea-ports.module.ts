import { Module } from '@nestjs/common';
import { SeaPortsService } from './sea-ports.service';
import { SeaPortsController } from './sea-ports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SeaPortsSchema } from './entities/sea-port.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SeaPorts', schema: SeaPortsSchema }]),
  ],
  controllers: [SeaPortsController],
  providers: [SeaPortsService],
})
export class SeaPortsModule {}
