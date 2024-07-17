import { Response } from 'express';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Res,
  HttpStatus,
  Query,
  NotFoundException,
} from '@nestjs/common';

export function sendError(
  res: Response,
  res_des: string,
  error?: any,
  res_code: string = '001',
  code: number = 400,
) {
  try {
    return res.status(code).json({
      success: false,
      response_code: `${res_code}`,
      statusCode: code,
      message: `${res_des}`,
      error: error,
    });
  } catch (error) {
    return responseError(
      res,
      'Error Occured',
      error.toString(),
      HttpStatus.BAD_GATEWAY,
    );
  }
}


export function sendResponse(
  res: Response,
  res_des: string,
  data: any,
  res_code: string = '00',
  code: number = 200,
) {
  try {
    return res.status(200).json({
      success: true,
      statusCode: code,
      message: `${res_des}`,
      response_code: `${res_code}`,
      // response_description: `${res_des}`,
      data,
    });
  } catch (error) {
    return responseError(
      res,
      'Error Occured',
      error.toString(),
      HttpStatus.BAD_GATEWAY,
    );
  }
}


export function sendSuccess(
  res: Response,
  res_des: string,
  res_code: string,
  code?: 200,
) {
  try {
    res.status(200).json({
      success: true,
      response_code: `${res_code}`,
      response_description: `${res_des}`,
    });
  } catch (error) {
    return responseError(
      res,
      'Error Occured',
      error.toString(),
      HttpStatus.BAD_GATEWAY,
    );
  }
}

function responseError(
  res: Response,
  res_des: string,
  res_code: string,
  code?: any,
) {
  res.status(400).json({
    success: false,
    response_code: `${res_code}`,
    response_description: `${res_des}`,
  });
}

