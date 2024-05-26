import React from 'react';

interface Destination {
  _id: string;
  name: string;
}

interface Tour {
  _id: string;
  name: string;
  description: string;
  imageCover: string[];
  destinations: Destination[];
}

interface SingleTourProps {
  tour: Tour;
}

const SingleTour: React.FC<SingleTourProps> = ({ tour }) => {
  return (
    <a
      href={`http://localhost:3000/tours/${tour.name}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div key={tour._id} className="detailDiv">
        <h2 className="singleDetailTitle">{tour.name}</h2>
        <p className="singleDetailDescription">{tour.description}</p>
        <img
          className="singleDetailImage"
          src={
            tour.imageCover && tour.imageCover.length > 0
              ? tour.imageCover[0]
              : 'defaultImageURL' 
          }
          alt={`Cover of ${tour.name}`}
        />
        <h4 className="goingPlaces">Destinations: </h4>
        {tour.destinations.map((destination) => (
          <a
            key={destination._id}
            href={`http://localhost:3000/destination/${destination.name}`}
          >
            {destination.name}
          </a>
        ))}
      </div>
    </a>
  );
};

export default SingleTour;