import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PaginationQuery,
  PropertiesFilter,
  ResponsePagination,
} from '../../../api/types';
import { ISeaPorts } from '../../../api/types/sea-ports.interface';
import { CreateSeaPortDto } from './dto/create-sea-port.dto';
import { UpdateSeaPortDto } from './dto/update-sea-port.dto';
@Injectable()
export class SeaPortsService {
  constructor(
    @InjectModel('SeaPorts') private seaPortsModel: Model<ISeaPorts>,
  ) {}

  async find(
    filter: PropertiesFilter,
    paginationQuery: PaginationQuery,
  ): Promise<ResponsePagination<ISeaPorts>> {
    // Run the query
    const totalCount = await this.seaPortsModel.estimatedDocumentCount();

    const query = this.seaPortsModel.find(); //.where({ location: { $ne: null } });

    /*   if (filter.operation) query = query.where({ operationType: filter.operation });
    if (filter.minPrice || filter.maxPrice)
      query = query.where({
        price: {
          $gte: Number(filter.minPrice) || Number.MIN_VALUE,
          $lte: Number(filter.maxPrice) || Number.MAX_SAFE_INTEGER,
        },
      });
    if (filter.latitude && filter.longitude)
      query = query.where({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [filter.longitude, filter.latitude],
            },
            $maxDistance: filter.maxDistance || 1000,
            $minDistance: 0,
          },
        },
      }); */

    const items = await query
      .sort(paginationQuery.sort)
      .skip(paginationQuery.skip)
      .limit(paginationQuery.limit)
      .exec();

    return {
      items,
      totalCount,
    };
  }

  async getById(id: string): Promise<ISeaPorts> {
    const seaPorts = await this.seaPortsModel.findById(id);

    if (!seaPorts) {
      throw 'Could not find the Sea Port with the given ID';
    }

    return seaPorts;
  }

  async create(seaPorts: CreateSeaPortDto): Promise<ISeaPorts> {
    const newSeaPorts = await new this.seaPortsModel(seaPorts).save();
    return newSeaPorts;
  }

  async update(
    id: string,
    updateSeaPortsDto: UpdateSeaPortDto,
  ): Promise<ISeaPorts> {
    const seaPortsToUpdate = await this.seaPortsModel.findByIdAndUpdate(
      id,
      updateSeaPortsDto,
      { new: true },
    );

    if (!seaPortsToUpdate) {
      throw new NotFoundException(`SeaPort #${id} not found`);
    }

    return seaPortsToUpdate;
  }

  async deleteById(id: string): Promise<ISeaPorts> {
    const seaPorts = await this.seaPortsModel.findByIdAndDelete(id);

    if (!seaPorts) {
      throw 'Could not find the Sea Port with the given ID';
    }

    return seaPorts;
  }
}
