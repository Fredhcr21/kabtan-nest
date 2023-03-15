import { SeaPortsModel } from '../models';

export interface BoatQueryParams {
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
