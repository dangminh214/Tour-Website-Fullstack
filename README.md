## Project title
FWE Homework Project: Tour Website 

## Motivation
A homework project from module FWE at Darmstadt University of Applied Science. A tour website included both frontend and backend

## Build status
Build status of continus integration: Completed
 
## Screenshots
![Home Page](image.png)
![All tours](image-1.png)
![All destinations](image-2.png)
![Tour Detail](image-3.png)
![Destination Detail](image-4.png)
![Create a new tour](image-5.png)
![Create a new destination](image-6.png)
![Edit an existed destination](image-7.png)

## Tech/framework used
Backend: Node JS, MongoDB

Frontend: ReactJS

## Features
Get all tours and show

Get all destinations and show 

Get a tour detail, edit its destinations and its detail 

New feature: Images slide in both tour and destination detail

Get a destination detail, access and get which tours go through it

Create new tour 

Create new destination 

Edit the information and detail of a tour 

Add a destination to an existed tour 

Delete a destination from an existed tour 

Search a tour using its name 

Search a destination using its name 

Search all tours using a destination name 

Go to a destination detail from a tour detail page

Delete an existed tour 

Delete an existed destination

## Code Example

Get all tours in Backend
```rb
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
```

Get all destinations in Backend
```rb
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
```

Create new tour in backend (Post request)
```rb
exports.createTour = catchAsync(async (req: Request, res: Response) => {
  const newTour = await tourModel.create(req.body);
  if (!newTour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Fail to create a new tour'
    });
  }
  if (newTour.destinations && Array.isArray(newTour.destinations)) {
    for (const destinationId of newTour.destinations) {
      await destinationModel.updateOne(
        { _id: destinationId },
        { $push: { tours: newTour._id } }
      );
    }
  }
  res.status(201).json({
    status: 'success',
    tour: newTour
  });
})
```

## Installation

Clone this repository: 
git clone https://code.fbi.h-da.de/stddngu2/fwe-ss-24-768770.git

## Tests
Test in Backend: 

Backend Directory: 
```rb
cd .\FWE_Tour_Website_Backend\
```

Run Test: 
```rb
npm test
```

## How to use?
Use Docker:
```rb
docker-compose up -- build
``` 

## Contribute

Dang Minh Nguyen - Computer Science - Darmstadt University of Applied Science


## License

HDa © [Dang Minh Nguyen](https://github.com/dangminh214)
