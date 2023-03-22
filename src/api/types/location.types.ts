import { Document } from 'mongoose';

export interface ILocation extends Document {
  type: string;
  coordinates: number[];
}

export interface GeoLocation extends Document {
  latitude: number;
  longitude: number;
}
