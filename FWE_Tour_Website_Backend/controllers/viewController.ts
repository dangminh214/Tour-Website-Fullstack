import { Request, Response, NextFunction  } from 'express';
import {tourModel} from '../models/tourModel';
import { catchAsync } from './../utils/catchAsync';

exports.getOverview = catchAsync(async (req: Request, res: Response) => {   
  let tours = await tourModel.find();

  if (!tours) {
    return res.status(404).json({
      status: 'fail',
      message: 'Error to get all tours, check the EndPoint'
    });
  }
    res.status(200).json({
      title: 'Overview',
      tours    
    }
  );
})