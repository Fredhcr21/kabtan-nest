import { PartialType } from '@nestjs/mapped-types';
import { CreateSeaPortDto } from './create-sea-port.dto';

export class UpdateSeaPortDto extends PartialType(CreateSeaPortDto) {}
