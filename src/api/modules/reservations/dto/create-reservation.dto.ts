import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressModel } from '../../../models/adddress.schema';
import { BoatType, NavigationType } from 'src/api/types';
import { BoatsModel } from '../../boats/entities/boat.entity';

export class CreateReservationDto {
  @ApiProperty({ type: () => AddressModel })
  @ValidateNested()
  @Type(() => AddressModel)
  readonly departurePlace: AddressModel;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly startDate: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly endDate: string;

  @ApiProperty({ type: String })
  @IsEnum(BoatType)
  @IsNotEmpty()
  readonly boatType: BoatType;

  @ApiProperty({ type: String })
  @IsEnum(NavigationType)
  @IsNotEmpty()
  readonly typeOfNavigation: NavigationType;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  pricePerDay: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  numberOfPeople: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  numberOfCabins: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  numberOfBeds: number;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsNotEmpty()
  superOwners: boolean;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  securityDeposit: number;

  @ApiProperty({ type: BoatsModel })
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  boat: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsNotEmpty()
  cancelled: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsNotEmpty()
  cancelledAt: boolean;
}
