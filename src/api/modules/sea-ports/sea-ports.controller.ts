import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Next,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { handleError } from '../../../core';
import { Helpers } from '../../../helpers';
import { CreateSeaPortDto } from './dto/create-sea-port.dto';
import { UpdateSeaPortDto } from './dto/update-sea-port.dto';
import { SeaPortsService } from './sea-ports.service';
@Controller('seaports')
export class SeaPortsController {
  constructor(private readonly seaPortsService: SeaPortsService) {}
  @Get()
  async find(
    @Res() res: Response,
    @Req() req: Request,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      Logger.debug(`GET /seaports : ${JSON.stringify(req.query)}`);
      const result = await this.seaPortsService.find(
        req.query,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Helpers.utils.buildPaginationQuery(req.query),
      );
      Logger.debug(`GET /seaports response: ${JSON.stringify(result)}`);
      res.status(HttpStatus.OK).json(result);
      return next();
    } catch (err) {
      return next(handleError(err));
    }
  }
  @Get('/:id')
  async getById(
    @Res() res: Response,
    @Param('id') id: string,
    @Req() req: Request,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      Logger.debug(`GET /seaports/:id : ${JSON.stringify(req.params)}`);
      const result = await this.seaPortsService.getById(id);
      Logger.debug(`GET /seaports/:id response: ${JSON.stringify(result)}`);
      res.status(HttpStatus.OK).json(result);
      return next();
    } catch (err) {
      return next(handleError(err));
    }
  }
  @Post()
  async create(
    @Res() res: Response,
    @Body() createSeaPortsDto: CreateSeaPortDto,
    @Req() req: Request,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      Logger.debug(`POST /seaports : ${JSON.stringify(req.body)}`);
      const result = await this.seaPortsService.create(createSeaPortsDto);
      Logger.debug(`POST /seaports response: ${JSON.stringify(result)}`);
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
    @Body() updateSeaPortsDto: UpdateSeaPortDto,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      Logger.debug(`PUT /seaports/:id : ${JSON.stringify(id)}`);
      const result = await this.seaPortsService.update(id, updateSeaPortsDto);
      Logger.debug(`PUT /seaports/:id response: ${JSON.stringify(result)}`);
      res.status(HttpStatus.OK).json(result);
      return next();
    } catch (err) {
      return next(handleError(err));
    }
  }
  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      Logger.debug(`DELETE /seaports/:id : ${JSON.stringify(req.params)}`);
      const result = await this.seaPortsService.deleteById(id);
      Logger.debug(`DELETE /seaports/:id response: ${JSON.stringify(result)}`);
      res.status(HttpStatus.OK).json(result);
      return next();
    } catch (err) {
      return next(handleError(err));
    }
  }
}
