import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {  sendResponse,  } from './BaseResponse';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export abstract class BaseService {
  constructor(
    protected readonly respository: Repository<any>,
  ) { }

  async creates(Res, data: any, message): Promise<any> {

    const datas = await this.respository.save(data);

    return sendResponse(Res, message, datas, "00", 200);

  }

  async findAlls(Res, message, condition = undefined): Promise<any> {
    let dats;
    if (condition) {
      dats = await this.respository.find(condition);
      return sendResponse(Res, message, dats, "00")
    }
    dats = await this.respository.find();

    return sendResponse(Res, message, dats, '00',200);

  }

  async paginates(Res, page = 1, per_page: number, message): Promise<any> {
    const take = per_page || 15;

    const [data, total] = await this.respository.findAndCount({
      take,
      skip: (page - 1) * take,
      order: {
        created_at: 'DESC',
      },
    });

    const datas = {
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
      data: data,
    };

    return sendResponse(Res, message, datas, '00');

  }

  async findOnes(Res, condition: any, message: string, relations?: string[]): Promise<any> {
    let data: any;

    if (relations) {
      data = await this.respository.findOne(
        {...condition,relations: relations}
        //   , {
        //   relations: [`${relations}`],
        // }
      );
    } else {
      data = await this.respository.findOne(condition);
    }
    if (!data) {
      throw new NotFoundException("Not found " + Error('Not found'))
    }
    return sendResponse(Res, message, data, '00');

  }

  async updates(res, id: number, data: any, message: string): Promise<any> {
    await this.respository.update(id, data);
    const datas = await this.respository.findOne({
      where: { id }
    });
    if (!datas) {
      throw new NotFoundException("Not found " + Error('Not found'))
    }
    return sendResponse(res, message, datas, '00');

  }

  async removes(res, id: number, message) {
    const dats = await this.respository.delete(id);
    return sendResponse(res, message, dats, '00');

  }


}