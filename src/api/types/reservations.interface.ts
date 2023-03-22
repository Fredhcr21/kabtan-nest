import { Document } from 'mongoose';
import { IAddress } from './address.types';
import { BoatQueryParams } from './boat.types';

export interface IReservation extends Document {
  departurePlace: IAddress;
  startDate: string;
  endDate: string;
  typeOfNavigation: {
    type: string;
    enum: ['Con tripulacion', 'Sin tripulacion', 'Con o sin tripulacion'];
  };
  boatType: {
    type: string;
    enum: [
      'Lancha',
      'Velero',
      'Neumatica',
      'Catamaran',
      'Casa flotante',
      'Moto de agua',
      'Goleta',
      'Yate',
    ];
  };
  pricePerDay: number;
  numberOfPeople: number;
  numberOfCabins: number;
  numberOfBeds: number;
  superOwners: boolean;
  securityDeposit: number;
  boat: BoatQueryParams;
  cancelled: boolean;
  cancelledAt: Date;
}
