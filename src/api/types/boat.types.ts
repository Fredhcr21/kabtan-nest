import { Document } from 'mongoose';
import { SeaPortsModel } from '../modules/sea-ports/entities/sea-port.entity';

export interface BoatQueryParams extends Document {
  boatType?: BoatType;
  seaPort?: SeaPortsModel;
  manufacturer?: string;
  manufactureYear?: number;
  typeOfNavigation?: NavigationType;
  capacity?: number;
  beds?: number;
  bathrooms?: number;
  lenghtOverall?: number;
  beam?: number;
  draft?: number;
  power?: number;
  photos: string[];
}

export enum BoatType {
  Lancha = 'lancha',
  Velero = 'velero',
  Neumatica = 'neumatica',
  Catamaran = 'catamaran',
  CasaFlotante = 'casaFlotante',
  MotoDeAgua = 'motoDeAgua',
  Goleta = 'goleta',
  Yate = 'yate',
}

export enum NavigationType {
  ConTripulacion = 'conTripulacion',
  SinTripulacion = 'sinTripulacion',
  ConOSinTripulacion = 'ConOSinTripulacion',
}
