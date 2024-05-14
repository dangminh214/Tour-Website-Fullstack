import React, { useState, useEffect } from 'react';

const TourDetail = () => {
  const [tour, setTour] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const url = window.location.pathname; // Get the path portion of the URL
    const parts = url.split("/").filter(Boolean); // Split the path by "/", filter out empty strings
    const lastParam = parts[parts.length - 1]; // Get the last element from the array
    const fetchTourDetail = async (tourName) => {
      try {
        const response = await fetch(`http://localhost:8000/tours/${tourName}`);
        const data = await response.json();
        console.log('Response from server:', data);
        if (data.status === 'success') {
          setTour(data.data.tour);
        } else {
          console.error('Failed to fetch tour:', data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tour:', error);
        setLoading(false);
      }
    };
  fetchTourDetail(lastParam);
}, []);

const deleteTour = async () => {
  if (window.confirm('Sind Sie sicher, diese Reise zu löschen')) {
    try {
      // Fetch the tour details to get the tourId
      const response = await fetch(`http://localhost:8000/tours/${tour.name}`);
      const data = await response.json();
      console.log(data)
      if (data.status === 'success') {
        const tourId = data.data.tour._id;

        // Delete the tour using the tourId
        const deleteResponse = await fetch(`http://localhost:8000/tours/deleteATour/${tourId}`, {
          method: 'DELETE',
        });

        if (deleteResponse.ok) { // Check if the status is 200-299
          setMessage('Diese Reise wurde erfolgreich gelöscht');
        } else {
          alert('Failed to delete tour');
        }
      } else {
        console.error('Failed to fetch tour:', data.message);
      }
    } catch (error) {
      console.error('Error deleting tour:', error);
      alert('Failed to delete tour');
    }
  }
};


return (
  <div>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className='tourDetailContainer'>
        <h1 className='tourNameDetail'>{tour.name}</h1>
        <p className='tourDescriptionDetail'>{tour.description}</p>
        {tour.imageCover && tour.imageCover.length > 0 ? (
          tour.imageCover.map((imageUrl, index) => (
            <img className='tourImagesDetail'
              key={index} 
              src={imageUrl} 
              alt={tour.name} 
            />
          ))
        ) : (
          <p>Keine Fotos</p>
        )}
        <h3>Reiseziele</h3>
        {tour.destinations && tour.destinations.length > 0 ? (
            <p>
              {tour.destinations.map((destination) => (
                <li key={destination._id}><a key={destination._id} href={`http://localhost:3000/destination/${destination.name}`}>{destination.name}</a></li>
              ))}
            </p>
          ) : (
            <p>Diese Reise hat keinem Reiseziel ERROR</p>
          )}
          <button className="deleteTourButton" onClick={deleteTour}>Diese Reise Löschen</button>
          {message && <p className='deleteMessage'>{message}</p>}
      </div>
    )}
  </div>
);
};

export default TourDetail;
