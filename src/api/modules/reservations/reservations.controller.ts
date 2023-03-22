import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Res,
  Next,
  Logger,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { handleError } from '../../../core';
import { Helpers } from '../../../helpers';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationService: ReservationsService) {}

  @Get()
  async find(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      Logger.debug(`GET /reservations : ${JSON.stringify(req.query)}`);
      const result = await this.reservationService.find(
        req.query,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Helpers.utils.buildPaginationQuery(req.query),
      );
      Logger.debug(`GET /reservations response: ${JSON.stringify(result)}`);
      res.status(HttpStatus.OK).json(result);
      return next();
    } catch (err) {
      return next(handleError(err));
    }
  }

  @Get('/:id')
  async getById(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      Logger.debug(`GET /reservations/:id : ${JSON.stringify(req.params)}`);
      const result = await this.reservationService.getById(id);
      Logger.debug(`GET /reservations/:id response: ${JSON.stringify(result)}`);
      res.status(HttpStatus.OK).json(result);
      return next();
    } catch (err) {
      return next(handleError(err));
    }
  }

  @Post()
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      Logger.debug(`POST /reservations : ${JSON.stringify(req.body)}`);
      const result = await this.reservationService.create(createReservationDto);
      Logger.debug(`POST /reservations response: ${JSON.stringify(result)}`);
      res.status(HttpStatus.OK).json(result);
      return next();
    } catch (err) {
      return next(handleError(err));
    }
  }

  @Put('/:id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      Logger.debug(`PUT /reservations/:id : ${JSON.stringify(id)}`);
      const result = await this.reservationService.update(
        id,
        updateReservationDto,
      );
      Logger.debug(`PUT /reservations/:id response: ${JSON.stringify(result)}`);
      res.status(HttpStatus.OK).json(result);
      return next();
    } catch (err) {
      return next(handleError(err));
    }
  }

  @Put('/cancel/:id')
  async cancelById(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      Logger.debug(`Cancel /reservations/:id : ${JSON.stringify(req.params)}`);
      const result = await this.reservationService.cancelById(id);
      Logger.debug(
        `Cancel /reservations/:id response: ${JSON.stringify(result)}`,
      );
      res.status(HttpStatus.OK).json(result);
      return next();
    } catch (err) {
      return next(handleError(err));
    }
  }
}
