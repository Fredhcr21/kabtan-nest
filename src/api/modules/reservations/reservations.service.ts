import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BoatQueryParams,
  IReservation,
  PaginationQuery,
  PropertiesFilter,
  ResponsePagination,
} from '../../../api/types';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel('Reservations')
    private readonly reservationsModel: Model<IReservation>,
    @InjectModel('Boats') private boatsModel: Model<BoatQueryParams>,
  ) {}
  async find(
    filter: PropertiesFilter,
    paginationQuery: PaginationQuery,
  ): Promise<ResponsePagination<IReservation>> {
    // Run the query
    const totalCount = await this.reservationsModel.estimatedDocumentCount();

    const query = this.reservationsModel.find(); //.where({ location: { $ne: null } });

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

  async getById(id: string): Promise<IReservation> {
    const reservations = await this.reservationsModel.findById(id);

    if (!reservations) {
      throw 'Could not find the reservation with the given ID';
    }

    return reservations;
  }

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<IReservation> {
    const boat = await this.boatsModel
      .findById(createReservationDto.boat)
      .exec();

    if (!boat) {
      throw new NotFoundException('Boat not found');
    }
    const newReservation = await new this.reservationsModel(
      createReservationDto,
    ).save();
    createReservationDto.boat = boat.id;
    return newReservation;
  }

  async update(
    id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<IReservation> {
    const boat = await this.boatsModel
      .findById(updateReservationDto.boat)
      .exec();

    if (!boat) {
      throw new NotFoundException('Boat not found');
    }
    const reservationToUpdate = await this.reservationsModel.findByIdAndUpdate(
      id,
      updateReservationDto,
      {
        new: true,
      },
    );

    if (!reservationToUpdate) throw new Error('Reservation does not exists');

    return reservationToUpdate;
  }

  async cancelById(id: string): Promise<IReservation> {
    const reservationsToCancel = await this.reservationsModel.findByIdAndUpdate(
      id,
      {
        cancelled: true,
        cancelledAt: new Date(),
        updatedAt: false,
      },
      {
        new: true,
      },
    );

    if (!reservationsToCancel) {
      throw 'Could not find the Reservation with the given ID';
    }

    return reservationsToCancel;
  }
}
