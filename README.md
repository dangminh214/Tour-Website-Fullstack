## Project title
FWE Homework Project: Tour Website 

## Motivation
A homework project from module FWE at Darmstadt University of Applied Science. A tour website included both frontend and backend

## Build status
Build status of continus integration: Completed
 
## Screenshots
![Home Page](![image](https://github.com/dangminh214/Tour-Website-Fullstack/assets/51837721/aaa0da01-97f7-46c5-8e58-702094e3d667)
![All tours](![image](https://github.com/dangminh214/Tour-Website-Fullstack/assets/51837721/8f5b2db7-e2d2-4086-b7ae-fac888bcd626)
![All destinations](https://github.com/dangminh214/Tour-Website-Fullstack/assets/51837721/7b0eda57-c174-46d1-83ba-057af69a91db)
![Tour Detail](https://github.com/dangminh214/Tour-Website-Fullstack/assets/51837721/a97ede59-e1cb-4b1c-9cb9-734f11b68a28)
![Destination Detail](https://github.com/dangminh214/Tour-Website-Fullstack/assets/51837721/e6a0da2c-5e74-4523-8c9a-bace02e018c7)
![Create a new tour](https://github.com/dangminh214/Tour-Website-Fullstack/assets/51837721/19a23de4-7def-40c0-925a-f1e79b76ae7f)
![Create a new destination](https://github.com/dangminh214/Tour-Website-Fullstack/assets/51837721/e0cb6c35-fcc7-40b5-a287-bf5f7cf09725)
![Edit an existed tour](https://github.com/dangminh214/Tour-Website-Fullstack/assets/51837721/35c240a5-c266-46fc-a455-cd6b40dfe5ac)


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
