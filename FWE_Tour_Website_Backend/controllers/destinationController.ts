import { Request, Response, NextFunction  } from 'express';
import { catchAsync } from '../utils/catchAsync';
import {destinationModel} from './../models/destinationModel'

exports.getAllDestination = catchAsync(async (req: Request, res: Response) => {
  let destinations = await destinationModel.find().populate('tours');

  if (!destinations) {
    return res.status(404).json({
      status: 'fail',
      message: 'Error to get all tours, check the EndPoint'
    });
  }

  res.status(200).json({
      status: 'success',
      title: 'Alle Reiseziele', 
      destinations
    }
  );
})

exports.getDestinationUsingName = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;
  const destination = await destinationModel.findOne({ name: name }).populate('tours');    
  if (!destination) {
    return res.status(404).json({
      status: 'fail',
      message: 'No destination found with that name'
    });
  }

  res.status(200).json({
    status: 'success',
    title: destination.name,
    data: {
      destination
    }
  }); 
}) 

exports.createDestination = catchAsync(async (req: Request, res: Response) => {
  const newDestination = await destinationModel.create(req.body);
  if (!newDestination) {
    return res.status(404).json({
      status: 'fail',
      message: 'Fail to create a new Destination'
    });
  }
  res.status(201).json({
    status: 'success',
    destination: newDestination
  });
})

export const errorNoDestination = catchAsync(async (req: Request, res: Response) => {
  try {
    res.status(404).json({
      titel: 'Kein Reiseziel gefunden',
      message: 'Keine Reiseziel gefunden'
    });
  } 
  catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

exports.deleteDestination = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const destination = await destinationModel.findByIdAndDelete(req.params.id);

  if (!destination) {
    return res.status(404).json({
      status: 'fail',
      message: 'No destination found with that ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: "delete successful"
  });
})