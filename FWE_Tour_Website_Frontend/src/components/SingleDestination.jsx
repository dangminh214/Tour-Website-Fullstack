const SingleDestination = ({ destination }) => {
  return (
    
      <div key={destination._id} className="destinationInfo">
        <h2 className="destinationTitle">{destination.name}</h2>
        <a href={`http://localhost:3000/destination/${destination.name}`}>
          Mehrere Details
        </a>
        <p className="destinationDescription">{destination.description}</p>
        <img
          className="destinationImage"
          src={destination.imageCover[0]}
          alt={destination.imageCover}
        />
        <h4>Reisenziele</h4>
        {destination.tours.map((tour) => (
          <p key={tour._id}>
            <a href={`http://localhost:3000/tours/${tour.name}`}>{tour.name}</a>
          </p>
        ))}
      </div>
  );
};

export default SingleDestination;
