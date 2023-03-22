import { AddressModel } from '../../../../api/models/adddress.schema';
import { LocationModel } from '../../../../api/models/location.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSeaPortDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: () => LocationModel })
  @ValidateNested()
  @Type(() => LocationModel)
  location: LocationModel;

  @ApiProperty({ type: () => AddressModel })
  @ValidateNested()
  @Type(() => AddressModel)
  address: AddressModel;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  urlLocation: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  photos: string[];
}
