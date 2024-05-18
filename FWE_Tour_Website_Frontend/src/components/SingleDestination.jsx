const SingleDestination = ({ destination }) => {
  return (
    <a
      href={`http://localhost:3000/destination/${destination.name}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div key={destination._id} className="detailDiv">
        <h2 className="destinationTitle">{destination.name}</h2>
        <p className="destinationDescription">{destination.description}</p>
        <img
          className="destinationImage"
          src={destination.imageCover[0]}
          alt={destination.imageCover}
        />
        <h4 className="goingPlaces">Reisenziele</h4>
        {destination.tours.map((tour) => (
          <p key={tour._id}>
            <a href={`http://localhost:3000/tours/${tour.name}`}>{tour.name}</a>
          </p>
        ))}
      </div>
    </a>
  );
};

export default SingleDestination;
