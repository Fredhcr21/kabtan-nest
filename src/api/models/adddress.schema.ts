import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
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
export class AddressModel {
  @Prop({ required: true })
  address: string;
  @Prop({ required: true })
  postalCode: number;
  @Prop({ required: true })
  city: string;
  @Prop({ required: true })
  state: string;
  @Prop({ required: true })
  country: string;
}

export const AddressSchema = SchemaFactory.createForClass(AddressModel);
