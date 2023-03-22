import { Document } from 'mongoose';

export interface IAddress extends Document {
  address: string;
  postalCode: number;
  city: string;
  state: string;
  country: string;
}
