import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BoatType, NavigationType } from '../../../types';
import { SeaPortsModel } from '../../sea-ports/entities/sea-port.entity';

@Schema({ timestamps: true, toObject: { virtuals: true } })
export class BoatsModel {
  @Prop({ type: String, required: true, enum: BoatType })
  boatType: BoatType;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'SeaPorts' })
  seaPort: SeaPortsModel;

  @Prop({ required: true })
  manufacturer: string;

  @Prop({ required: true })
  manufacturerYear: number;

  @Prop({ required: true, enum: NavigationType, type: String })
  typeOfNavigation: NavigationType;

  @Prop({ required: true })
  capacity: number;

  @Prop({ required: true })
  beds: number;

  @Prop({ required: true })
  bathrooms: number;

  @Prop({ required: true })
  lenghtOverall: number;

  @Prop({ required: true })
  beam: number;

  @Prop({ required: true })
  draft: number;

  @Prop({ required: true })
  power: number;

  @Prop({ type: [String], required: true })
  photos: string[];
}

export const BoatsSchema = SchemaFactory.createForClass(BoatsModel);
