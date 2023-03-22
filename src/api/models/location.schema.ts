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
export class LocationModel {
  @Prop({ enum: ['Point'], required: true })
  type: string;
  @Prop({ type: [Number], required: true })
  coordinates: number[];
}

export const LocationSchema = SchemaFactory.createForClass(LocationModel);
