import { Document } from 'mongoose';
import { IAddress } from './address.types';
import { ILocation } from './location.types';
export interface ISeaPorts extends Document {
  name: string;
  location: ILocation;
  address: IAddress;
  urlLocation: string;
  photos: string[];
}
