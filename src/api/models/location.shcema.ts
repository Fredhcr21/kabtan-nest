import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class locationSchema {
  @Prop()
  type: {
    type: string;
    enum: ['Point'];
    required: true;
  };
  @Prop()
  coordinates: {
    type: [number];
    required: true;
  };
}

@Schema()
export class AddressSchema {
  @Prop()
  address: {
    type: string;
    required: true;
  };
  @Prop()
  postalCode: {
    type: number;
    required: true;
  };
  @Prop()
  city: {
    type: string;
    required: true;
  };
  @Prop()
  state: {
    type: string;
    required: true;
  };
  @Prop()
  country: {
    type: string;
    required: true;
  };
}
