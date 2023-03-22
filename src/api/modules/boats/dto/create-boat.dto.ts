import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BoatType, NavigationType } from '../../../../api/types';
import { SeaPortsModel } from '../../sea-ports/entities/sea-port.entity';

export class CreateBoatDto {
  @ApiProperty({ type: String })
  @IsEnum(BoatType)
  @IsNotEmpty()
  readonly boatType: BoatType;

  @ApiProperty({ type: SeaPortsModel })
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  seaPort: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly manufacturer: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  readonly manufacturerYear: number;

  @ApiProperty({ type: String })
  @IsEnum(NavigationType)
  @IsNotEmpty()
  readonly typeOfNavigation: NavigationType;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  readonly capacity: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  readonly beds: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  readonly bathrooms: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  readonly lenghtOverall: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  readonly beam: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  readonly draft: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  readonly power: number;

  @ApiProperty({ type: [String] })
  @IsArray()
  readonly photos: string[];
}
