import { Request, Response, NextFunction  } from 'express';
const ObjectId = require('mongoose').Types.ObjectId;
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
import {tourModel} from '../models/tourModel';
import {destinationModel} from '../models/destinationModel';

exports.getAllTours = catchAsync(async (req: Request, res: Response) => {
  let tours = await tourModel.find().populate('destinations');

  if (!tours) {
    return res.status(404).json({
      status: 'fail',
      message: 'Error to get all tours, check the EndPoint'
    });
  }

    res.status(200).json({
      status: 'success',
      title: 'Alle Reisen',    
      tours
    }
  );
})

exports.createTour = catchAsync(async (req: Request, res: Response) => {
  const newTour = await tourModel.create(req.body);
  if (!newTour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Fail to create a new tour'
    });
  }
  res.status(201).json({
    status: 'success',
    tour: newTour
  });
  console.log("POST a new tour")
})

exports.getTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const tour = await tourModel.findById(req.params.id).populate('destinations');
  
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'No tour found with that ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });

  console.log("GET a tour using mongodbid")
});

exports.getTourUsingDestination = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const  destinationName:string = req.params.destination;
  const destination = await destinationModel.findOne({ name: destinationName}); 
  const destinationId = destination?._id.toString();
  
  if (!destination) {
    return res.status(404).json({
      status: 'fail',
      message: 'Destination not found'
    });
  }
  const tours = await tourModel.find({ destinations: destinationId}).populate('destinations'); 

  if (tours.length <= 0) {
    return res.status(404).json({
      status: 'success',
      message: 'No tour found with that destination'
    });
  }

  if (!tours) {
    return res.status(404).json({
      status: 'fail',
      message: 'Error, cannot find a tour with this destination'
    });
  }

  res.status(200).json({
    status: 'success',
    title: `ToursMit${destinationName}`,
    data: {
      tours
    }
  });

  console.log("GET a tour using destination");
})

exports.getTourUsingName = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;
  const tour = await tourModel.findOne({ name: name}).populate('destinations');      

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'No tour found with that name'
    });
  }
  res.status(200).json({
    status: 'success',
    title: `${name}`,
    data: {
        tour
      },
    }
  );

  console.log("GET a tour using name");
})

exports.updateTourByName = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const tour = await tourModel.findOneAndUpdate({name: req.params.name}, req.body, {
    new: true,
    runValidators: true
  });

  if (!tour) {
    return next(new AppError('No tour found with that name', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });

  console.log("PATCH Update a tour")
});

exports.deleteTour = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const tour = await tourModel.findByIdAndDelete(req.params.id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'No tour found with that ID'
    });
  }

  res.status(204).json({
    status: 'success',
    data: "delete successful"
  });

  console.log("Delete a tour using mongodbID successful")
})

exports.addTour = catchAsync(async (req: Request, res: Response) => {
  const newTour = await tourModel.create(req.body);
  if (!newTour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Fail to create a new tour'
    });
  }
  res.status(201).json({
    status: 'success',
    tour: newTour
  });
  console.log("POST a new tour")
})

export const addDestinationToTour = catchAsync(async (req: Request, res: Response) => {
  const { tourName } = req.params;
  const { destinations } = req.body;

  try {
    const tourData = await tourModel.findOne({ name: tourName}); 
    const tourId = tourData?._id.toString();
    const tour = await tourModel.findByIdAndUpdate(
      tourId,
      { $addToSet: { destinations: { $each: destinations } } },
      { new: true }
    );

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.status(200).json({ message: 'Destinations added successfully', tour });
  } catch (error) {
    console.error('Error adding destinations to tour:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export const removeDestinationFromTour = catchAsync(async (req: Request, res: Response) => {
  const { tourName, destinationName } = req.params;

  try {
    const destinationData = await destinationModel.findOne({name: destinationName});
    const destinationId = destinationData?._id.toString();

    const tourData = await tourModel.findOne({name: tourName})
    const tourId = tourData?._id.toString();
    const tour = await tourModel.findByIdAndUpdate(
      tourId,
      { $pull: { destinations: destinationId } },
      { new: true }
    );

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.status(200).json({ message: 'Destination removed successfully', tour });
  } catch (error) {
    console.error('Error removing destination from tour:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export const errorNoTour = catchAsync(async (req: Request, res: Response) => {
  try {
    res.status(404).json({ message: 'Keine Reise gefunden'});
  } 
  catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export const deleteATourByName = catchAsync(async (req: Request, res: Response) => {
  console.log(req.params);
  const { tourName } = req.params;
  console.log(tourName)

  try {
      const deleteTour = await tourModel.deleteOne({ name: tourName });

      res.status(204).json({
        status: 'success',
        data: "delete successful"
      });

      console.log("Delete a tour using name successful")
  } catch (error) {
    console.error('Error removing this tour:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});