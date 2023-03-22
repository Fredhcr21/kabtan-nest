import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BoatType, NavigationType } from 'src/api/types';
import { SchemaTypes } from 'mongoose';
import { AddressModel } from '../../../models/adddress.schema';
import { BoatsModel } from '../../boats/entities/boat.entity';

@Schema({ timestamps: true, toObject: { virtuals: true } })
export class ReservationsModel {
  @Prop({ required: true })
  departurePlace: AddressModel;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;

  @Prop({ required: true, enum: NavigationType, type: String })
  typeOfNavigation: NavigationType;

  @Prop({ type: String, required: true, enum: BoatType })
  boatType: BoatType;

  @Prop({ required: true })
  pricePerDay: number;

  @Prop({ required: true })
  numberOfPeople: number;

  @Prop({ required: true })
  numberOfCabins: number;

  @Prop({ required: true })
  numberOfBeds: number;

  @Prop({ required: true })
  superOwners: boolean;

  @Prop({ required: true })
  securityDeposit: number;

  @Prop({ type: SchemaTypes.ObjectId, required: 'Boats' })
  boat: BoatsModel;

  @Prop({ default: null })
  cancelled: boolean;

  @Prop({ default: null })
  cancelledAt: Date;
}

export const ReservationsSchema =
  SchemaFactory.createForClass(ReservationsModel);
