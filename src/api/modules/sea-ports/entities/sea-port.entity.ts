import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddressModel } from '../../../models/adddress.schema';
import { LocationModel } from '../../../models/location.schema';
@Schema({
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: {
    // transform: (_doc, { location, ...ret }) => ({
    //   ...ret,
    //   location: {
    //     latitude: location?.coordinates[1],
    //     longitude: location?.coordinates[0],
    //   },
    // }),
    virtuals: true,
  },
})
export class SeaPortsModel {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  location: LocationModel;
  @Prop({ required: true })
  address: AddressModel;
  @Prop({ required: true })
  urlLocation: string;
  @Prop({ type: [String], required: true })
  photos: string[];
}
export const SeaPortsSchema = SchemaFactory.createForClass(SeaPortsModel);
