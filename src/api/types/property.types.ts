import { GeoLocation, GeoLocationMongoDB } from './location.types';

export interface PropertiesFilter {
  operation?: OperationType;
  minPrice?: number;
  maxPrice?: number;
  latitude?: number;
  longitude?: number;
  maxDistance?: number;
}

export enum OperationType {
  Renta = 'renta',
  Venta = 'venta',
  Inversion = 'inversion',
}

export enum PropertyType {
  Vivienda = 'vivienda',
  Terreno = 'terreno',
  Comercio = 'comercio',
  Inversion = 'inversion',
}

export enum ViviendaType {
  CasaSola = 'casaSola',
  CasaEnPrivada = 'casaEnPrivada',
  Departamento = 'departamento',
  TownHouse = 'townHouse',
}

export enum TerrenoType {
  TerrenoSolo = 'terrenoSolo',
  TerrenoEnPrivada = 'terrenoEnPrivada',
  TerrenoFrenteAlMar = 'terrenoFrenteAlMar',
  TerrenoComercial = 'terrenoComercial',
}

export enum ComercioType {
  Oficina = 'oficina',
  LocalComercial = 'localComercial',
  Bodega = 'bodega',
}

export enum InversionType {
  Crowdfunding = 'crowdfunding',
  Remate = 'remate',
}

export enum Currency {
  MXN = 'MXN',
  USD = 'USD',
}

export enum Documents {
  Escritura = 'escritura',
  CedulaCatastral = 'cedulaCatastral',
  CroquisCatastral = 'croquisCatastral',
  PredialVigente = 'predialVigente',
  LibertadDeGravamen = 'libertadDeGravamen',
}

export enum TerrenoTipoDeSuelo {
  Habitacional = 'habitacional',
  Comercial = 'comercial',
  Mixto = 'mixto',
}

export interface Address {
  address: string;
  postalCode: number;
  city: string;
  state: string;
  country: string;
}

export interface Property {
  id: string;
  operationType: OperationType;
  title: string;
  description: string;
  price: number;
  currency: Currency;
  location: GeoLocationMongoDB | GeoLocation;
  displayExactLocation: boolean;
  address: Address;
  photos: string[];
}

export interface PropertyVivienda extends Property {
  type: ViviendaType;
  landSurface: number;
  constructionSurface: number;
  years: number;
  bedrooms: number;
  bathrooms: number;
  halfBathroom: boolean;
  garage: boolean;
  garageSize: number;
  garageCovered: boolean;
  pool: boolean;
  study: boolean;
  serviceRoom: boolean;
  serviceRoomWithBathroom: boolean;
  maintenanceFee: boolean;
  petsAllowed: boolean;
  pavedStreet: boolean; // CALLE PAVIMENTADA (SI O NO)
  electricalEnergyAtFootOfLand: boolean; // ENERGIA ELECTRICA A PIE DE TERRENO
  drinkingWaterAtFootOfLand: boolean; // AGUA POTABLE A PIE DE TERRENO
  sanitaryDrainage: boolean; // DRENAJE SANITARIO
  privateWithAmenities: boolean; // SI ES PRIVADA CUENTA CON AMENIDADES
  amenitiesDescription: string; // CON QUE AMENIDADES CUENTA
  documents: Documents;
}

export interface PropertyTerreno extends Property {
  type: TerrenoType;
  landSurface: number;
  bardas: boolean;
  verticesDelimitados: boolean;
  terrenoTipoDeSuelo: TerrenoTipoDeSuelo;
  pavedStreet: boolean; // CALLE PAVIMENTADA (SI O NO)
  electricalEnergyAtFootOfLand: boolean; // ENERGIA ELECTRICA A PIE DE TERRENO
  drinkingWaterAtFootOfLand: boolean; // AGUA POTABLE A PIE DE TERRENO
  sanitaryDrainage: boolean; // DRENAJE SANITARIO
  privateWithAmenities: boolean; // SI ES PRIVADA CUENTA CON AMENIDADES
  amenitiesDescription: string; // CON QUE AMENIDADES CUENTA
  documents: Documents;
}

export interface PropertyComercio extends Property {
  type: ComercioType;
  landSurface: number;
  constructionSurface: number;
  pavedStreet: boolean; // CALLE PAVIMENTADA (SI O NO)
  electricalEnergyAtFootOfLand: boolean; // ENERGIA ELECTRICA A PIE DE TERRENO
  drinkingWaterAtFootOfLand: boolean; // AGUA POTABLE A PIE DE TERRENO
  sanitaryDrainage: boolean; // DRENAJE SANITARIO
  maintenanceFee: boolean;
  documents: Documents;
}

export interface PropertyInversion extends Property {
  type: InversionType;
  tickersDeInversion: string[]; // TICKETS DE INVERSION -  Cantidades definidas por el tipo de casa - Posibilidada de subir más de uno
  formaDePagoDelRendimiento: string; // FORMA DE PAGO DEL RENDIMIENTO - Periodo en el que se pagará
  cuentaConPermisos: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface SearchFilter {
  operationType?: OperationType[];
  propertyType?: PropertyType[];
  priceRange?: PriceRange;
}
