const SingleTour = ({ tour }) => {
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
              : `No image available for ${tour.name}`
          }
          alt={`Fotos von ${tour.name}`}
        />
        <h4 className="goingPlaces">Reisenziele: </h4>
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
