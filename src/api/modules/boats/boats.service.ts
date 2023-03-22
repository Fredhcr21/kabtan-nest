import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BoatQueryParams,
  PaginationQuery,
  PropertiesFilter,
  ResponsePagination,
} from 'src/api/types';
import { ISeaPorts } from '../../types/sea-ports.interface';
import { CreateBoatDto } from './dto/create-boat.dto';
import { UpdateBoatDto } from './dto/update-boat.dto';

@Injectable()
export class BoatsService {
  constructor(
    @InjectModel('Boats') private boatsModel: Model<BoatQueryParams>,
    @InjectModel('SeaPorts') private readonly seaPortsModel: Model<ISeaPorts>,
  ) {}
  async find(
    filter: PropertiesFilter,
    paginationQuery: PaginationQuery,
  ): Promise<ResponsePagination<BoatQueryParams>> {
    // Run the query
    const totalCount = await this.boatsModel.estimatedDocumentCount();

    const query = this.boatsModel.find(); //.where({ location: { $ne: null } });

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

  async getById(id: string): Promise<BoatQueryParams> {
    const boats = await this.boatsModel.findById(id);

    if (!boats) {
      throw new Error('Could not find the Boat with the given ID');
    }

    return boats;
  }

  async create(createBoatDto: CreateBoatDto): Promise<BoatQueryParams> {
    const seaPort = await this.seaPortsModel
      .findById(createBoatDto.seaPort)
      .exec();

    if (!seaPort) {
      throw new NotFoundException('SeaPort not found');
    }
    const newBoats = await new this.boatsModel(createBoatDto).save();
    createBoatDto.seaPort = seaPort.id;
    return newBoats;
  }

  async update(
    id: string,
    updateBoatDto: UpdateBoatDto,
  ): Promise<BoatQueryParams> {
    const seaPort = await this.seaPortsModel
      .findById(updateBoatDto.seaPort)
      .exec();

    if (!seaPort) {
      throw new NotFoundException('SeaPort not found');
    }
    const boatsToUpdate = await this.boatsModel.findByIdAndUpdate(
      id,
      updateBoatDto,
      {
        new: true,
      },
    );

    if (!boatsToUpdate) throw new Error('Boat does not exists');

    return boatsToUpdate;
  }

  async deleteById(id: string): Promise<BoatQueryParams> {
    const boats = await this.boatsModel.findByIdAndDelete(id);

    if (!boats) {
      throw new Error('Could not find the Boat with the given ID');
    }

    return boats;
  }
}
