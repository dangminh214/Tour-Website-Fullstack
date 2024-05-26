import React from 'react';

interface Tour {
  _id: string;
  name: string;
}

interface Destination {
  _id: string;
  name: string;
  description: string;
  imageCover: string[];
  tours: Tour[];
}

interface SingleDestinationProps {
  destination: Destination;
}

const SingleDestination: React.FC<SingleDestinationProps> = ({ destination }) => {
  return (
    <a
      href={`http://localhost:3000/destination/${destination.name}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div key={destination._id} className="detailDiv">
        <h2 className="singleDetailTitle">{destination.name}</h2>
        <p className="singleDetailDescription">{destination.description}</p>
        <img
          className="singleDetailImage"
          src={destination.imageCover[0]}
          alt={`Cover of ${destination.name}`}
        />
        <h4 className="goingPlaces">Tours:</h4>
        {destination.tours.map((tour) => (
          <a key={tour._id} href={`http://localhost:3000/tours/${tour.name}`}>
            {tour.name}
          </a>
        ))}
      </div>
    </a>
  );
};

export default SingleDestination;