const SingleTour = ({ tour }) => {
  return (
    <div className="tourContainer">
      <div key={tour._id} className="tourInfo">
        <h2 className="tourTitle">{tour.name}</h2>
        <a href={`http://localhost:3000/tours/${tour.name}`}>Mehrere Details</a>
        <p className="tourDescription">{tour.description}</p>
        <img
          className="tourImage"
          src={
            tour.imageCover && tour.imageCover.length > 0
              ? tour.imageCover[0]
              : `No image available for ${tour.name}`
          }
          alt={`Fotos von ${tour.name}`}
        />
        <h4>Reisenziele: </h4>
        {tour.destinations.map((destination) => (
          <p key={destination._id}>
            <a href={`http://localhost:3000/destination/${destination.name}`}>
              {destination.name}
            </a>
          </p>
        ))}
      </div>
    </div>
  );
};
export default SingleTour;
