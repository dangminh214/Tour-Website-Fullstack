import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const handleDivClick = () => {
    navigate(`/tours/${tour.name}`);
  };
  return (
    <div
      key={tour._id}
      className="detailDiv"
      onClick={handleDivClick}
      style={{ cursor: "pointer" }}
    >
      <h2 className="singleDetailTitle">{tour.name}</h2>
      <p className="singleDetailDescription">{tour.description}</p>
      <img
        className="singleDetailImage"
        src={
          tour.imageCover && tour.imageCover.length > 0
            ? tour.imageCover[0]
            : "defaultImageURL"
        }
        alt={`Cover of ${tour.name}`}
      />
      <h4 className="goingPlaces">Destinations: </h4>
      {tour.destinations.map((destination) => (
        <Link
          key={destination._id}
          to={`http://localhost:3000/destination/${destination.name}`}
        >
          {destination.name}
        </Link>
      ))}
    </div>
  );
};

export default SingleTour;
