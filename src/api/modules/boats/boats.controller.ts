import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
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
import { BoatsService } from './boats.service';
import { CreateBoatDto } from './dto/create-boat.dto';
import { UpdateBoatDto } from './dto/update-boat.dto';

@Controller('boats')
export class BoatsController {
  constructor(private readonly boatsService: BoatsService) {}

  @Post()
  async create(
    @Body() createBoatDto: CreateBoatDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      Logger.debug(`POST /boats : ${JSON.stringify(req.body)}`);
      const result = await this.boatsService.create(createBoatDto);
      Logger.debug(`POST /boats response: ${JSON.stringify(result)}`);
      res.status(HttpStatus.OK).json(result);
      return next();
    } catch (err) {
      return next(handleError(err));
    }
  }

  @Get()
  async find(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      Logger.debug(`GET /boats : ${JSON.stringify(req.query)}`);
      const result = await this.boatsService.find(
        req.query,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Helpers.utils.buildPaginationQuery(req.query),
      );
      Logger.debug(`GET /boats response: ${JSON.stringify(result)}`);
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
      Logger.debug(`GET /boats/:id : ${JSON.stringify(req.params)}`);
      const result = await this.boatsService.getById(id);
      Logger.debug(`GET /boats/:id response: ${JSON.stringify(result)}`);
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
    @Body() updateBoatDto: UpdateBoatDto,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      Logger.debug(`PUT /boats/:id : ${JSON.stringify(id)}`);
      const result = await this.boatsService.update(id, updateBoatDto);
      Logger.debug(`PUT /boats/:id response: ${JSON.stringify(result)}`);
      res.status(HttpStatus.OK).json(result);
      return next();
    } catch (err) {
      return next(handleError(err));
    }
  }

  @Delete('/:id')
  async deleteById(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      Logger.debug(`DELETE /boats/:id : ${JSON.stringify(req.params)}`);
      const result = await this.boatsService.deleteById(id);
      Logger.debug(`DELETE /boats/:id response: ${JSON.stringify(result)}`);
      res.status(HttpStatus.OK).json(result);
      return next();
    } catch (err) {
      return next(handleError(err));
    }
  }
}
